var vistaconfig = require("../../lib/rpcvista/vistaconfig");
var vista = require("../../lib/rpcvista/VistaJS");
var utils = require("../../lib/utils");
var vitals = require('./vitals');

exports.selectPatient = function(loginOptions, patientId, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWPT SELECT', 
    patientId, 
    function(error, result){
      if(result instanceof Error){
        callback(result, null);
      }else{
        var result_split = result.split('^');
        var patient = {
          name: result_split[0],
          gender: result_split[1],
          dob: vista.convertVistaDateToISODate(result_split[2]),
          ssn: result_split[3],
          age: result_split[14],
          localPid: patientId
        };
        callback(error, patient);
      }
    }
  );
}


/**
 * Output the given `str` to _stdout_
 * or the stream specified by `options`.
 *
 * @param {{stream: Writable}} options
 * @param {Integer} patientId
 * @return {Object} exports for chaining
 * filter - problem;allergy;consult;vital;lab;procedure;obs;order;treatment;med;ptf;factor;immunization;exam;cpt;education;pov;skin;image;appointment;surgery;document;visit;mh"

 */
exports.getVirtualPatientRecord = function(loginOptions, patientid, filter, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  
  var params = {'"patientId"' : patientid}
  if(filter){
    params['"domain"'] = filter;
  }
    
  
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'VPR GET PATIENT DATA JSON', 
    {
      '"patientId"' : patientid
    }, 
    function(error, result){
      if(result instanceof Error){
        callback(result, null);
      }else{
        //result = utils.replaceAll(result, '\"','"');
        result = JSON.parse(result);
        callback(error, result);
      }
    }
  );
}

// Parse the results back from ORWPT LIST ALL
function parse_ORWPT_patient_results(results){
  // parse result into JSON
  var LINE_SEPARATOR = "\r\n";
  var EXTRANEOUS_SEPARATOR = "^^^^";
  var DFN_SEPARATOR = "^";
  return results.split(LINE_SEPARATOR).map(
    function(val){
      var temp = val.split(EXTRANEOUS_SEPARATOR)[0].split(DFN_SEPARATOR);
      if(temp[0] && temp[1]){
        return {'dfn':temp[0], 'name':temp[1], 'localPid': temp[0]};
      }
    }
  ).filter(function(element){
    if(element){
      return element;
    }
  });
}


exports.findPatientByName = function(loginOptions, patientName, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWPT LIST ALL', 
    [patientName, '1'], 
    function(error, result){
      console.log(result);
      if(result instanceof Error){
        callback(result, null);
      }else{
        var parsed_results = parse_ORWPT_patient_results(result)
        callback(error, parsed_results);
      }
    }
  );
}

exports.findPatientBySSN = function(loginOptions, ssn, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWPT FULLSSN', 
    ssn, 
    function(error, result){
      console.log(result);
      if(result instanceof Error){
        callback(result, null);
      }else{
        var parsed_results = parse_ORWPT_patient_results(result)
        callback(error, parsed_results);
      }
    }
  );
}

exports.findPatientByLastFive = function(loginOptions, lastFive, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  // check that value matches, the input format
  var re = new RegExp("^[A-Za-z][0-9]{4}$");
  if(lastFive && re.test(lastFive)){
    lastFive = lastFive.toUpperCase();
    vista.callRpc(
      vistaconfig.logger, 
      configuration, 
      'ORWPT LAST5', 
      lastFive, 
      function(error, result){
        console.log(result);
        if(result instanceof Error){
          callback(result, null);
        }else{
          var parsed_results = parse_ORWPT_patient_results(result)
          callback(error, parsed_results);
        }
      }
    );
  }else{
    callback(new Error("Please Pass in the first letter of the last name and the last 4 SSN"), null);
  }
  
}

/**
* Gets all patients from VistA in JSON format
* @param {object} loginOptions - VistA login options
* @param {function} callback - the function to call with results
*/
exports.getAllPatients = function(loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWPT LIST ALL', 
    ['', '1'], 
    function(error, result){
      console.log(result);
      if(result instanceof Error){
        callback(result, null);
      }else{
        var parsed_results = parse_ORWPT_patient_results(result)
        callback(error, parsed_results);
      }
    }
  );
}

/**
* Get medications for a patient
* @param {string} dfn - the patient id in VistA
* @param {object} loginOptions - VistA login options
* @param {function} callback - the function to call with results
* @returns {Array} - medications
*/
exports.getMedicationsForPatient = function(dfn, loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWPS COVER', 
    dfn, 
    function(error, result){  
      if(result instanceof Error){
        callback(result, null);
      }else{
        /** 
        * VISTA Results example:
        * '404194R;O^LISINOPRIL 5MG TAB^33590^DISCONTINUED\r\n404195R;O^SIMVASTATIN 5MG TAB^33591^DISCONTINUED\r\n404196R;O^WARFARIN (C0UMADIN) NA 1MG TAB^33589^DISCONTINUED\r\n1N;O^CHROMIUM PICOLINATE 200MCG CAP^33594^DISCONTINUED\r\n2N;O^ACETAMINOPHEN 325MG TAB^33593^DISCONTINUED\r\n3N;O^GINKGO TAB^33592^ACTIVE\r\n4N;O^CHROMIUM PICOLINATE 200MCG CAP^33595^ACTIVE\r\n5N;O^ACETAMINOPHEN 325MG TAB^33596^ACTIVE\r\n1448P;I^IBUPROFEN TAB^37097^PENDING\r\n'
        */
        var LINE_SEPARATOR = '\r\n';
        var IEN_SEPARATOR = ';';
        var DESCRIPTION_SEPARATOR = '^';
        
        var parsed_results = result.split(LINE_SEPARATOR).map(function(element){
          var line = element.trim();
          if(line){
            console.log("LINE: "+element);
            var ien_split = element.split(IEN_SEPARATOR);
            var details = ien_split[1].split(DESCRIPTION_SEPARATOR);
            var administration = "";
            if(details[0] == 'O'){
              administration = "outpatient";
            }else if(details[0] == 'I'){
              administration = "inpatient";
            }
          
            return {
              ien: ien_split[0],
              administration: administration,
              medication: details[1],
              additional_number: details[2],
              status: details[3]
            };
          }
          return null;          
        }).filter(function(element){
          if(element){
            return element;
          }
        });
        callback(error, parsed_results);
      }
    }
  );
}




/**
* Get medications detail for a patient
* @param {string} dfn - the patient id in VistA
* param {string} ien - The internal entry drug number entered by Pharmacy personnel into the DRUG file (#50) to identify Unit Dose and IV medications., retrievable by the getMedicationsForPatient operation
* @param {object} loginOptions - VistA login options
* @param {function} callback - the function to call with results
* @returns {Array} - medications
*/
exports.getMedicationDetailForPatient = function(dfn, ien, loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORWPS DETAIL', 
    [dfn, ien], 
    function(error, result){  
      if(result instanceof Error){
        callback(result, null);
      }else{
        callback(error, result);
      }
    }
  );
}


// get the most recent vitals for a patient
exports.getVitals = function(patientId, loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORQQVI VITALS', 
    patientId, 
    function(error, result){  
      if(result instanceof Error){
        callback(result, null);
      }else{
        var LINE_SEPARATOR = '\r\n';
        var DESCRIPTION_SEPARATOR = '^';
        /*
        * Vitals are returned in the format:
        * vital ien^vital type^rate/value^date/time taken
        *
        * vital result str - 24027^BP^120/60^3150206.0805^120/60^^
        */
        var results = [];
        
        if(result){
          result.split(LINE_SEPARATOR).forEach(function(line){
            var vital = {};
            line.split(DESCRIPTION_SEPARATOR).forEach(function(element, index){
              if(index == 0){
                vital['ien'] = element;
              }else if(index == 1){
                vital['type'] = element;
                vital['description'] = vitals.vital_codes[element];
              }else if(index == 2){
                vital['value'] = element;
              }else if(index == 3){
                vital['date'] = vista.convertVistaDateToISODate(element); 
              }
            });
            // only if vital is populated add it to the results
            if(vital.ien)
              results.push(vital);
          });
        }
        
        callback(error, results);
      }
    }
  );
}

/*

Vitals Param, expecting an array in the following format

var vitals = { 
    "1": "VST^DT^"+"3150206.0805",  // Vital date
    "2": "VST^PT^"+"100022", // Patient
    "3": "VST^HL^32", // location
    "4": "VIT^BP^^^120/60^11549^^3150206.0805"
}
*/
exports.addVital = function(vitalOptions, loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  
  var vitalParams = {};
  if('observed_date_time' in vitalOptions){
    var converted_observed_date = new Date(vitalOptions['observed_date_time']);
    if(converted_observed_date){
      vitalParams['1'] = 'VST^DT^'+vista.convertToVistaDate(converted_observed_date);
    }else{
      callback(new Error("Oberved Date Time has to be in ISO 8601 format"), null);
    }
  }else{
    callback(new Error("No Oberved Date Time for Vital"), null);
  }
  
  if('patient' in vitalOptions){
    vitalParams['2'] = "VST^PT^"+vitalOptions['patient'];
  }else{
    callback(new Error("No Patient DFN provided"), null);
  }
  
  if('location' in vitalOptions){
    vitalParams['3'] = "VST^HL^"+vitalOptions['location'];
  }else{
    callback(new Error("No Hospital/Clinic IEN provided"), null);
  }
  
  if('vital' in vitalOptions){
    // VIT^vital type^^^value^provider^units^date/time
    var vital_param_str = "VIT^#vital_type^^^#value^#provider^#units^#date";
    var vital = vitalOptions['vital'];
    // check for all required params in vital object
    if('type' in vital){
      if(vital['type'] in vitals.vital_codes){
          vital_param_str = vital_param_str.replace('#vital_type',vitals.vital_codes[vital['type']].pce);
      }else{
        callback(new Error("Not a valid in Type in Vital Types, get valid valid types for vitals operation"), null);
      }
    }else{
      callback(new Error("No Vital Type specified in vitals object"), null);
    }
    
    if('value' in vital){
      vital_param_str = vital_param_str.replace('#value',vital['value']);
    }else{
      callback(new Error("No Vital Value specified in vitals object"), null);
    }
    
    if('provider' in vital){
      vital_param_str = vital_param_str.replace('#provider',vital['provider']);
    }else{
      callback(new Error("No provider Value specified in vitals object"), null);
    }
    // units are not required -- in the case of BP we are not using UNITS
    if('units' in vital){
      vital_param_str = vital_param_str.replace('#units',vital['units']);
    }else{
      vital_param_str = vital_param_str.replace('#units','');
    }
    vital_param_str = vital_param_str.replace('#date',vista.convertToVistaDate(new Date(vitalOptions['observed_date_time'])));
    vitalParams['4'] = vital_param_str;
  }
  
  
  
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'ORQQVI2 VITALS VAL & STORE', 
    vitalParams, 
    function(error, result){  
      if(result instanceof Error){
        callback(result, null);
      }else{
        if(result.indexOf('ERROR') != -1){
          error = new Error("Error occured Writing Vitals, VistA message: "+result);
        }else{
          result = {'success':true};
        }
        callback(error, result);
      }
    }
  );
}