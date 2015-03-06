var vistaconfig = require("../../lib/rpcvista/vistaconfig");
var vista = require("../../lib/rpcvista/VistaJS");

/**
 * Output the given `str` to _stdout_
 * or the stream specified by `options`.
 *
 * @param {{stream: Writable}} options
 * @param {Integer} patientId
 * @return {Object} exports for chaining
 */
exports.getAll = function(loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  // execute get clinics rpc
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'SD GET CLINICS BY NAME', 
    ['','',''],
    function(error, result){
      console.log("RESULT: "+result);
      if(result instanceof Error){
        callback(result, null);
      }else{
        // parse clinics result
        var LINE_SEP = "\r\n";
        var RESULT_TEXT="RESULT(";
        var BEGIN_VALUE="T(";
        var END_PAREN=")=";
        var lines = result.split(LINE_SEP);

        var clinics = {};
        lines.forEach(function(line){
          if(line.indexOf(RESULT_TEXT) != -1){
            var paren_value = line.substring(line.indexOf(BEGIN_VALUE)+2, line.indexOf(END_PAREN));
            var paren_value_split = paren_value.split(',');
            if(paren_value_split instanceof Array){  
              var value = line.split(')=')[1];
              if(paren_value.indexOf("ID") != -1){
                if(!clinics[paren_value_split[0]]){
                  clinics[paren_value_split[0]] = {};
                }
                clinics[paren_value_split[0]].ien=value;
              }else if(paren_value.indexOf("NAME") != -1){
                if(!clinics[paren_value_split[0]]){
                  clinics[paren_value_split[0]] = {};
                }
                clinics[paren_value_split[0]].name=value;
              }
            }
          }
        });
        var clinic_results = [];
        for(result_id in clinics){
          clinic_results.push(
            {
              ien: clinics[result_id].ien, 
              name: clinics[result_id].name
            }
          );
        }
        callback(error, clinic_results);
    }
  }
  );
}


exports.getAvailability = function(clinicid, loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  // execute get clinics rpc
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'SD GET CLINIC AVAILABILITY', 
    clinicid,
    function(error, result){
      console.log("RESULT: "+result);
      if(result instanceof Error){
        callback(result, null);
      }else{
        // parse clinics result
        var LINE_SEP = "\r\n";
        var RESULT_TEXT="RESULT(";
        var BEGIN_VALUE="T(";
        var END_PAREN=")=";
        var lines = result.split(LINE_SEP);
        var results = Array();
        lines.forEach(function(line){
          if(line.indexOf(RESULT_TEXT) != -1){
            var paren_value = line.substring(line.indexOf(BEGIN_VALUE)+2, line.indexOf(END_PAREN));
            var paren_value_split = paren_value.split(',');
            if(paren_value_split instanceof Array){  
              if(paren_value_split[1] == '1'){
                var date = vista.convertVistaDateToISODate(paren_value_split[0]);
                var value = line.split(')=')[1];
                if(value)
                  results.push( {day: date, slots: value});
              }
            }
          }  
        });
        callback(error,results);
      }
    }
  );
}


exports.getDetails = function(clinicid, loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  // execute get clinics rpc
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'SD GET CLINIC DETAILS', 
    clinicid,
    function(error, result){
      console.log("RESULT: "+result);
      if(result instanceof Error){
        callback(result, null);
      }else{
        // parse clinics result
        var LINE_SEP = "\r\n";
        var RESULT_TEXT="RESULT(";
        var BEGIN_VALUE="T(";
        var END_PAREN=")=";
        var lines = result.split(LINE_SEP);
        var results = {};
        
        var lines = result.split(LINE_SEP);
        lines.forEach(function(line){
          // get the result property
          var property = line.substring(line.indexOf('("')+2,line.indexOf('")'));
          // get the result value and set it in the results object
          if(line.split(END_PAREN)[1])
            results[property] = line.split(END_PAREN)[1];
        });
        callback(error, results);
      }
    }
  );
}