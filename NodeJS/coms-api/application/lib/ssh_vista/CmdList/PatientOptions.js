var config = require('../config');
var OptionsCmds = [
	config.AuthenticationCmds[0],
	config.AuthenticationCmds[1],
    { "prompt" : config.options.namespace, "cmd" : "D ^XUP", "ignoreAndWait" : true, fcn : null, "LookingForString" : false, "String2Find" : "" },
    { "prompt" : "Select OPTION NAME: ", "cmd" : "ORDERS", "ignoreAndWait" : true, fcn : null, "LookingForString" : false, "String2Find" : "" },
    { "prompt" : "CHOOSE 1-4: ", "cmd" : "1", "ignoreAndWait" : false, fcn : null, "LookingForString" : false, "String2Find" : "" },
    { "prompt" : "Select Patient: Change View// ", "cmd" : "FD", "ignoreAndWait" : false, fcn : null, "LookingForString" : false, "String2Find" : "" },
    { "prompt" : "Select PATIENT NAME: ", "cmd" : "<VALUE>", "ignoreAndWait" : false, fcn : null, "LookingForString" : false, "String2Find" : "" },
    { "prompt" : "NO PROMPT TO LOOK FOR", "cmd" : "", "ignoreAndWait" : true, fcn : null, "LookingForString" : true, "String2Find" : "Select: Next Screen//", "GOODString2Find" : "Select: Next Screen//", "FAILString2Find" : "??" }
];

exports.OptionsCmds = OptionsCmds;
