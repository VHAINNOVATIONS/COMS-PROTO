var vistaconfig = require("../../lib/rpcvista/vistaconfig");
var vista = require("../../lib/rpcvista/VistaJS");

var userhelper = require("./helpers/userhelper");
/*
^XWB(8994,356,3,1,0)="Result(0) is the users DUZ."
^XWB(8994,356,3,2,0)="Result(1) is the user name from the .01 field."
^XWB(8994,356,3,3,0)="Result(2) is the users full name from the name standard file."
^XWB(8994,356,3,4,0)="Result(3) is data about the division that the user is working in."
^XWB(8994,356,3,5,0)="          IEN of file 4^Station Name^Station Number"
^XWB(8994,356,3,6,0)="Result(4) is the users Title."
^XWB(8994,356,3,7,0)="Result(5) is the Service/Section."
^XWB(8994,356,3,8,0)="Result(6) is the users langage choice."
^XWB(8994,356,3,9,0)="Result(7) is the users DTIME value."

example:
'11716\r\nRADIOLOGIST,ONE\r\nOne Radiologist MD\r\n500^CAMP MASTER^500\r\nPHYSICIAN\r\nMEDICAL\r\n\r\n99\r\n\r\n'

*/


exports.getInfo = function(loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'XUS GET USER INFO', 
    function(error, result){
      if(result instanceof Error){
        callback(result, null);
      }else{
        var result_split = result.split('\r\n');
        if(result_split && result_split.length >= 7){
          var division_split = result_split[3].split('^');
          var division = result_split[3];
          if(division_split && division_split.length == 3){
            division = {
              ien: division_split[0],
              station_name: division_split[1],
              station_number: division_split[2]
            }
          }
          var info = {
            duz: result_split[0],
            name: result_split[1],
            full_name: result_split[2],
            division: division,
            title: result_split[4],
            section: result_split[5],
            language: result_split[6],
            dtime: result_split[7]
          };
          callback(error, info);
        }else{
          callback(new Error("No Information on user: "+result), null);
        }
          
        
      }
    }
  );
}

// get a list of all Valid Vista Providers
exports.findUserByName = function(loginOptions, query, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  console.log("Vista Query: "+query);
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWU NEWPERS',[vista.adjustStringForVistaSearch(query), '1'], 
    function(error, result){
      if(result instanceof Error){
        callback(result, null);
      }else{
        callback(error, userhelper.parseUserData(result));
      }
    }
  );
};
  