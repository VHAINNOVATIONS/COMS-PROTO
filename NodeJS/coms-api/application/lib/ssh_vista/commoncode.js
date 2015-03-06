/*jslint devel: true, node: true, eqeq: true, nomen: true, unparam: true, sloppy: true, white: true */
/* global: require __dirname module */
var config = require('./config');

var eol = "\r\n";

var net = require("net");
var split = require("split");
var util = require("util");
var OutputBuffer;


function havePrompt(data, prompt) {
	if (prompt === config.options.namespace) {
		if (data.indexOf(prompt) == 0 && data.indexOf(">") == data.length - 1) {
			return true;
		}
		return false;
	}
	return (prompt === data);
}

function look4Prompt(socket, data, ProcCmdList, fncPass, fncFail) {
	var prompt = data[data.length - 1];
	console.log("");
	console.log("Look4Prompt - %s", prompt);
	console.log("GOT ]%s[; Waiting for ]%s[", prompt, ProcCmdList[0].prompt);
	if (havePrompt(prompt, ProcCmdList[0].prompt)) {
		if (ProcCmdList[0].cmd !== "") {
			console.log("Got PROMPT! %s writing %s", prompt, ProcCmdList[0].cmd);
			socket.write(ProcCmdList[0].cmd + eol);
			OutputBuffer += ProcCmdList[0].cmd + "<br>";
			ProcCmdList.shift();
		} else {
			console.log("Got PROMPT! %s Done!", prompt);
			socket.destroy(); // Close the connection
			fncPass("res");
			return true;
		}
	}
	return false;
}

function look4String(socket, data, line, ProcCmdList, fncPass, fncFail) {
	if (ProcCmdList[0].LookingForString) {
		var s2f_GOOD = ProcCmdList[0].GOODString2Find;
		var s2f_FAIL = ProcCmdList[0].FAILString2Find;
		var jObj = JSON.stringify(ProcCmdList[0], null, 4);
		console.log("CMD List - %s", jObj);
		console.log("Looking for GOOD string ]%s[", s2f_GOOD);
		console.log("or BAD string ]%s[", s2f_FAIL);
		console.log("within ]%s[", data);
		if (data.indexOf(s2f_GOOD) >= 0) {
			console.log("Found %s in DATA", s2f_GOOD);
		}
		if (line.indexOf(s2f_GOOD) >= 0) {
			console.log("Found %s in LINE", s2f_GOOD);
		}
		if (data.indexOf(s2f_FAIL) >= 0) {
			console.log("Found %s in DATA", s2f_FAIL);
		}
		if (line.indexOf(s2f_FAIL) >= 0) {
			console.log("Found %s in LINE", s2f_FAIL);
		}
		// console.log(line);
		if (data.indexOf(s2f_GOOD) >= 0 || line.indexOf(s2f_GOOD) >= 0) {
			console.log("GOOD String Found!");
			socket.destroy(); // Close the connection
			fncPass('res');
		} else if (data.indexOf(s2f_FAIL) >= 0 || line.indexOf(s2f_FAIL) >= 0) {
			console.log("FAILURE String Found!");
			socket.destroy(); // Close the connection
			fncFail('failure');
		} else {
			if (!ProcCmdList[0].ignoreAndWait) {
				console.log("String not found, Failing...");
				socket.destroy(); // Close the connection
				fncFail('failure');
			} else {
				console.log("String not found, Ignore and Wait for more...");
				// ProcCmdList.shift();
			}
		}
	}
}




function ProcessCommandList2(ProcCmdList, str, fncPass, fncFail) {
	var socket = net.createConnection({
		port: config.options.port,
		host: config.options.host
	});
	socket.on("connect", function() {
		console.log("Connected");
		OutputBuffer = [];
	});

	socket.setEncoding('utf8');
	//socket.setEncoding('hex');
	socket.pipe(split());

	socket.on("data", function(line) {
		var buf, b = line.split("\n");
		OutputBuffer = OutputBuffer.concat(b);
		/*
		 * If processing a command that expects data coming back
		 * And if we're looking for a particular string in that response
		 * Pass the string to look for and if found return true
		 * else return false and wait for prompt
		 */
		if (!look4Prompt(socket, b, ProcCmdList, fncPass, fncFail)) {
			console.log("Looking for string -----------------");
			look4String(socket, b, line, ProcCmdList, fncPass, fncFail);
		}

		if (util.isArray(OutputBuffer)) {
			// console.log("OutputBuffer is an array");
			buf = OutputBuffer.join("<br>");
		} else {
			// console.log("OutputBuffer is NOT an Array");
			buf = OutputBuffer;
		}
	});

	socket.on("error", function(err) {
		throw err;
	});

	socket.on('end', function() {
		console.log('Connection end');
	});
	socket.on('timeout', function() {
		console.log('Connection timeout');
	});
	socket.on('drain', function() {
		console.log('Connection drain');
	});
	socket.on('error', function() {
		console.log('Connection error');
	});
	socket.on('close', function() {
		console.log('Connection closed');
	});
}


exports.ProcessCommandList2 = ProcessCommandList2;