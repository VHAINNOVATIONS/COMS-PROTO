var vistaconfig = require("../../lib/rpcvista/vistaconfig");
var vista = require("../../lib/rpcvista/VistaJS");

/**
* Verify that access code and verify code are valid
**/
exports.verify = function(accessCode, verifyCode, callback){
  var configuration = vistaconfig.configuration;
  configuration['accessCode'] = accessCode;
  configuration['verifyCode'] = verifyCode;
  vista.authenticate(vistaconfig.logger, configuration, callback);
}

