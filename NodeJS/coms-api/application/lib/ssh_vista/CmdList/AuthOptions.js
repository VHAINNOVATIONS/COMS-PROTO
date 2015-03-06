var config = require('../config');
var OptionsCmds = [
	config.AuthenticationCmds[0],
	config.AuthenticationCmds[1],
	{
		"prompt": config.options.namespace,
		"cmd": "D ^XUP",
		"ignoreAndWait": true,
		fcn: null,
		"LookingForString": false,
		"String2Find": ""
	},
	{
		"prompt": "Select OPTION NAME: ",
		"cmd": "",
		"ignoreAndWait": true,
		fcn: null,
		"LookingForString": false,
		"String2Find": ""
	}
];

exports.OptionsCmds = OptionsCmds;