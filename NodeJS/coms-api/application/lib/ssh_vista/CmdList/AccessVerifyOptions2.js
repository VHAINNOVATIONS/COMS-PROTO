var config = require('../config');
var OptionsCmds = [
	config.AuthenticationCmds[0],
	config.AuthenticationCmds[1],
    { "prompt" : config.options.namespace, "cmd" : "D ^ZU", "ignoreAndWait" : true, fcn : null, "LookingForString" : false, "String2Find" : "" },
    { "prompt" : "ACCESS CODE: ", "cmd" : "", "ignoreAndWait" : true, fcn : null, "LookingForString" : false, "String2Find" : "" },
    { "prompt" : "VERIFY CODE: ", "cmd" : "", "ignoreAndWait" : false, fcn : null, "LookingForString" : false, "String2Find" : "" },
    { "prompt" : "Option: ", "cmd" : "", "ignoreAndWait" : true, fcn : null, "LookingForString" : true, "String2Find" : "ACCESS CODE: " },
    { "prompt" : "Select TERMINAL TYPE NAME: C-VT102// ", "cmd" : "", "ignoreAndWait" : false, fcn : null, "LookingForString" : false, "String2Find" : "" }

];

exports.OptionsCmds = OptionsCmds;
