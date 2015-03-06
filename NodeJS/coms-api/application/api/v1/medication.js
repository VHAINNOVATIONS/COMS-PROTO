var vistaconfig = require("../../lib/rpcvista/vistaconfig");
var vista = require("../../lib/rpcvista/VistaJS");
var orderhelper = require("./helpers/orderhelper");









function getMedicineIENFromORWULIndex(loginOptions, index, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWUL FVSUB',
    [ '32', index, index ], // have to find out what 32 is equal to, seems to be hardcoded in CPRS
    function(error, result){
      if(result instanceof Error){
        callback(result, null);
      }else{
        if(result.indexOf('^') !== -1){
          var result_split = result.split('^');
          var resultObj = {
            ien: result_split[0],
            name: result_split[1].replace('\r\n', '')
          };
          callback(error, resultObj);
        }else{
          callback(new Error("No Medicine found for Index: "+index), null);
        }
      }
    }
  
  );
}


exports.findByName = function(loginOptions, medicationName, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  
  if(medicationName){
    medicationName = vista.adjustStringForVistaSearch(medicationName);
  
    console.log("Seraching for: "+medicationName);
  
    vista.callRpc(
      vistaconfig.logger, 
      configuration, 
      'ORWUL FVIDX',
      [ '32', medicationName ], // have to find out what 32 is equal to, seems to be hardcoded in CPRS
      function(error, result){
        if(result instanceof Error){
          callback(result, null);
        }else{
          if(result.indexOf('^') !== -1){
            var result_split = result.split('^');
            var med_index = result_split[0];
            getMedicineIENFromORWULIndex(loginOptions, med_index, callback);
          }else{
            callback("No Medication found in ORWUL FVIDX matching: "+medicationName, null);
          }
        }
      }
    );
  }else{
    callback(new Error("Please Enter Medication Name"), null);
  }
  
}


exports.getOrderInfo = function(loginOptions, medicationIEN, patientIEN, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWDPS2 OISLCT',
    [ medicationIEN, 'U', patientIEN, 'N', 'N' ], 
    function(error, result){
      if(result instanceof Error){
        callback(result, null);
      }else{
        callback(error, orderhelper.parseMedicationOrderDetails(result));
      }
    }
  );
  
}

