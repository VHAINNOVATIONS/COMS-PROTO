var util = require('util');
var events = require('events');
var net = require('net');
var winston = require('winston');
var socket = new net.Socket();


winston.add(winston.transports.File, { filename: 'consoleout.log' });

var params = {
  host: "dbittest.dbitpro.com",
  port: 23,
  shellPrompt: 'COMS>',
  loginPrompt: 'Username:',
  passwordPrompt: 'Password:',
  username: 'rahul.gokulnath',
  password: 'dbitPASS964',
  timeout: 5000,
  // removeEcho: 4
};

var CHAR_RETURN = "\r\n";

var VistaTelnetClient = function(params, executingAction){
  this.opts = params;
  this.buffer = "";
  this.executingAction = executingAction;
  // find if the login prompt is in the response
  this.isLogin = function(line, index, array){
    if(line == this.opts.loginPrompt){
      return true;
    }else{
      return false;      
    }

  }
}

// Make Vista Client an Event Emitter
VistaTelnetClient.prototype = new events.EventEmitter;


/*
* connect and login to the VistA instane
*/
VistaTelnetClient.prototype.connect = function(){
  self = this;
  this.socket = net.createConnection(params.port, params.host);
  this.socket.setEncoding('utf8');
  this.socket.on('data', function(data) {
    // buffer response from telnet so we can read the whole response
    self.buffer += String(data).trim();
    if(self.buffer.indexOf("<LICENSE LIMIT EXCEEDED>") != -1){
      self.emit('error', {error: "VistA License Limit Exceeded"});
      self.socket.close();
    }
    else if(self.buffer.indexOf(self.opts.shellPrompt) != -1){
      console.log("Shell Ready");
      self.emit("shell-ready");
      self.buffer = "";
      winston.log("info", "Current Command: "+self.executingAction.commandIndex);
      self.executingAction.commands[self.executingAction.commandIndex].execute(self.socket);
      self.executingAction.nextCommand();
    }else if(self.buffer.indexOf(self.opts.passwordPrompt) != -1){
      self.socket.write(self.opts.password+CHAR_RETURN);
      self.emit("shell-password");
      self.buffer = "";
    }else if(self.buffer.indexOf(self.opts.loginPrompt) != -1){
      self.socket.write(self.opts.username+CHAR_RETURN);
      self.emit("shell-login");
      self.buffer = "";
    }else{
      // check if we are currently executing an action
      if(self.executingAction != null){
        var vistacommand = self.executingAction.commands[self.executingAction.commandIndex];
        // check if any waitForResponses in the executing action match
        if(self.buffer.indexOf(vistacommand.waitForResponse) != -1){
          winston.log("info","Found Wait For Response: " +vistacommand.waitForResponse + " Executing: "+vistacommand.command);
          // wait 2 seconds before executing
          setTimeout(vistacommand.execute(self.socket, self.buffer), 2000);
          self.buffer = "";
          // advance to the next command in the list
          self.executingAction.nextCommand();
          
        }
      }
    }
  }).on('connect', function() {
    console.log("node socket: CONNECTED");
    // Manually write an HTTP request.
  }).on('end', function() {
    console.log('DONE');
  });
}


var VistaCommand = function(command, waitForResponse, callback){
  this.command = command;
  this.waitForResponse = waitForResponse;
  this.execute = function(socket, buffer){
   socket.write(this.command+CHAR_RETURN);
   winston.log("info","Executing Buffer: "+buffer);
   callback(buffer);
  }
}

// a concrete action for Vista
// for example look up a patient
var VistaAction = function(){
  var self = this;
  this.commands = new Array();
  this.commandIndex = 0;
  // add to Command array
  this.addCommand = function(command){
    self.commands.push(command);
  },
  // advance to the next command
  this.nextCommand = function(data){
    self.commandIndex += 1;
  },
  this.currentCommand = function(){
    return self.commands[commandIndex];
  }
}

var viewPatientAction = new VistaAction();

var bringUpMenu = new VistaCommand(
  "D ^ZU",
  "ACCESS CODE:",
  function(data){
    //console.log("After Bringing up menu: "+data);
  }
)

var sendAccessCode = new VistaCommand(
  "1radiologist",
  "ACCESS CODE:",
  function(data){
    //console.log("After Brining up Access Code: "+data);
  }
)

var sendVerifyCode = new VistaCommand(
  "radiologist1"+CHAR_RETURN+CHAR_RETURN,
  "VERIFY CODE:",
  function(data){
    //console.log("After Bringing up Verify Code: "+data);
  }
)

var bringUpClinicianMenu = new VistaCommand(
  "OE",
  "<CPM>",
  function(data){
    //console.log("Bring up menu");
  }
)

var bringUpPatientSearch = new VistaCommand(
  "FD",
  "Select Patient: Change View//",
  function(data){
    //console.log("Bring up menu");
  }
)

var searchPatient = new VistaCommand(
  "PATIENT",
  "elect Patient: Change View//",
  function(data){
    winston.log("info","Searching Patient: "+data);
  }
)


viewPatientAction.addCommand(bringUpMenu);
viewPatientAction.addCommand(sendAccessCode);
viewPatientAction.addCommand(sendVerifyCode);
viewPatientAction.addCommand(bringUpClinicianMenu);
viewPatientAction.addCommand(bringUpPatientSearch);
viewPatientAction.addCommand(searchPatient);

var client = new VistaTelnetClient(params, viewPatientAction);

client.connect();
