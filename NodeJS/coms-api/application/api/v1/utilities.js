var vistaconfig = require("../../lib/rpcvista/vistaconfig");
var vista = require("../../lib/rpcvista/VistaJS");

exports.currentDate = function(loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWU DT', 
    'NOW', 
    function(error, result){
      if(result instanceof Error){
        callback(result, null);
      }else{
        callback(error, {date: result});
      }
    }
  );
}