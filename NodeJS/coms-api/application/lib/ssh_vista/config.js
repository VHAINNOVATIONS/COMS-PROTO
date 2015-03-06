var options = {
	"ServerPort" : 4000,
	"namespace" : "COMS",
	"user" : "rahul.gokulnath",
	"pass" : "dbitPASS964",
	//"host" : "199.179.23.117",
  "host" : "dbittest.dbitpro.com",
	"port" : 23
};

var AuthenticationCmds = [
	{ "hex" : "557365726e616d653a20", "prompt" : "Username: ", "cmd" : options.user, "ignoreAndWait" : true, "fcn" : null, "LookingForString" : false, "String2Find" : "" },
	{ "hex" : "50617373776f72643a20", "prompt" : "Password: ", "cmd" : options.pass, "ignoreAndWait" : false, fcn : null, "LookingForString" : false, "String2Find" : "" },
	{ "hex" : "434f4d533e", "prompt" : options.namespace, "cmd" : "", "ignoreAndWait" : false, fcn : null, "LookingForString" : false, "String2Find" : "" }
];

exports.options = options;
exports.AuthenticationCmds = AuthenticationCmds;



