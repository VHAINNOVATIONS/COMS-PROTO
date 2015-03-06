var vistaconfig = require("../../lib/rpcvista/vistaconfig");
var vista = require("../../lib/rpcvista/VistaJS");
var orderhelper = require("./helpers/orderhelper");

exports.getDialogIENByName = function(loginOptions, dialogName, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'XWB GET VARIABLE VALUE', 
    vista.RpcParameter.reference('$O(^ORD(101.41,"B","'+dialogName+'",0))'), 
    function(error, result){
      if(result instanceof Error){
        callback(result, null);
      }else{
        callback(error, {ien: result});
      }
    });
  
}

// Get Order Dialog by IEN
exports.getDialogByIEN = function(loginOptions,dialogIEN, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWDXM MENU', 
    dialogIEN, 
    function(error, result){
      if(result instanceof Error){
        callback(result, null);
      }else{
        callback(error, orderhelper.parseOrderDialog(result));
      }
    });
}

// Get Order Dialog Details  by Name
exports.getDialogByName = function(loginOptions,dialogName, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWDXM MENU', 
    vista.RpcParameter.reference('$O(^ORD(101.41,"B","'+dialogName+'",0))'), 
    function(error, result){
      if(result instanceof Error){
        callback(result, null);
      }else{
        callback(error, orderhelper.parseOrderDialog(result));
      }
    });
}



