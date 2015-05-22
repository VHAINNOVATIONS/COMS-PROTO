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

exports.getAll = function(loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(vistaconfig.logger, configuration, 'ORWUL FV4DG', 'UD RX', function(error, result){
    var firstParam = result.split('^')[0];
    var lastIndex = result.split('^')[1];
  
    vista.callRpc(vistaconfig.logger, configuration, 'ORWUL FVSUB', [firstParam, '1', lastIndex], function(error, result){
      var results = [];
      var lines = result.split('\r\n');
      lines.forEach(function(line){
        if(line.indexOf('^') !== -1){
          var result_split = line.split('^');
          var resultObj = {
            ien: result_split[0],
            name: result_split[1].replace('\r\n', '').replace(/~+$/, '')
          };
          results.push(resultObj);
        }else{
          // skip drug
          //callback(error,null);
        }
      });
      console.log("Got here", results);
      callback(error, results);
    });
  });
  
}

