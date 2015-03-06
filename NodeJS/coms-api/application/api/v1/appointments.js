var vistaconfig = require("../../lib/rpcvista/vistaconfig");
var vista = require("../../lib/rpcvista/VistaJS");



/**
get scheduling request types
*/
exports.getSchedulingRequestTypes = function(loginOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'SD GET SCHDULING REQUEST TYPES', 
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
          if(line.indexOf(RESULT_TEXT) != -1 && line.indexOf('^') != -1){
            var line_value = line.split(END_PAREN)[1].split('^');
            results.push({type: line_value[0], description: line_value[1]});
          }  
        });
        callback(error,results);
      }
    }
  );
}


// Patient - DFN
// Clinic - IEN

/*
DFN		[Required,Numeric] Patient IEN
SC		[Required,Numeric] Clinic IEN
SD		[Required,DateTime] Appointment date/time
TYPE		[Required,Numeric] Purpose of visit (drawn from the Appointment Types list – see 			$$LSTAPPT^SDMAPI1)
STYP	[Optional,Numeric] Appointment Type Sub-Category (one of the active Sharing Agreement Sub-Category returned by LSTASTYP^SDMAPI5, to add a new Sub-Category use ADDASC^SDMAPI5)
LEN		[Required,Numeric] Appointment length in minutes.
SRT		[Optional,String] Scheduling request type (one of the codes returned by LSTSRT^SDMAPI1)
OTHR		[Optional,String]  Any other tests ordered in association with the appointment
CIO		[Optional,String] If set to “CI” the appointment will be checked-in. 
LAB		[Optional,DateTime] If this patient is scheduled for laboratory tests in conjunction with this 		appointment, set LAB to the date/time the patient should report.
XRAY		[Optional,DateTime] If this patient is scheduled for x-ray in conjunction with this 			appointment, set XRAY to the date/time the patient should report.
EKG		[Optional,DateTime] If this patient is scheduled for EKG in conjunction with this 				appointment, set EKG to the date/time the patient should.
RQXRAY	[Optional,Boolean] Set to 1 if x-ray films are required for this appointment.
CONS		[Optional,Numeric] Consult associated with this appointment (pointer to 				Request/Consultation file).
LVL	[Optional,Numeric] 
-	Forces appointment creation if it is set to 1 and user has SDOB security key (ignores all warnings described below)
-	If set to 1 will return an error if there are no open slots and user do not have SDOB security key
-	If set to 2 will return an error if there are no open slots
-	If set to anything higher that 2 or left undefined, will return an error if the patient has an active appointment on same time, or on same day, or a canceled appointment on same time, or if there are no open slots.

*/
exports.make = function(loginOptions, appointmentOptions, callback ){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  
  // params to pass to RPC
  var apptParams = Array();
  // check we have all required parameters
  if('patient' in appointmentOptions){
    apptParams.push(appointmentOptions['patient']);
  }else{
    callback(new Error("Patient parameter is required"), null);
  }
  if('clinic'  in appointmentOptions){
    apptParams.push(appointmentOptions['clinic']);
  }else{
    callback(new Error("Clinic parameter is required"), null);
  }
  if('date' in appointmentOptions){
    var apptDate = vista.convertToVistaDate(new Date(appointmentOptions['date']));
    if(apptDate)
      apptParams.push(apptDate);
    else
      callback(new Error("Need Valid Appointment date in ISO 8601 format"), null);
  }else{
    callback(new Error("Need Valid Appointment date in ISO 8601 format"), null);
  }
  if('appointment_type' in appointmentOptions){
    apptParams.push(appointmentOptions['appointment_type']);
  }else{
    callback(new Error("Appointment Type parameter is required"), null);
  }
  if('sub_type'  in appointmentOptions){
    apptParams.push(appointmentOptions['sub_type']);
  }
  if('length' in appointmentOptions){
    apptParams.push(appointmentOptions['length']);
  }else{
    callback(new Error("Appointment Length parameter is required"), null);
  }
  if('scheduling_request_type'  in appointmentOptions){
    apptParams.push(appointmentOptions['scheduling_request_type']);
  }
  
  if('other'  in appointmentOptions){
    apptParams.push(appointmentOptions['other']);
  }
  // check patient into Appointment
  if('check_in' in appointmentOptions){
    if(appointmentOptions.check_in)
      apptParams.push("CI");
  }
  
  if('lab' in appointmentOptions){
    var labDate = vista.convertToVistaDate(new Date(appointmentOptions['lab']));
    if(labDate)
      apptParams.push(labDate);
    else
      callback(new Error("Need Valid Lab date in ISO 8601 format"), null);
  }
  
  if('xray' in appointmentOptions){
    var xrayDate = vista.convertToVistaDate(new Date(appointmentOptions['lab']));
    if(xrayDate)
      apptParams.push(xrayDate);
    else
      callback(new Error("Need Valid X-Ray date in ISO 8601 format"), null);
  }
  if('ekg' in appointmentOptions){
    var ekgDate = vista.convertToVistaDate(new Date(appointmentOptions['lab']));
    if(xrayDate)
      apptParams.push(ekgDate);
    else
      callback(new Error("Need Valid EKG date in ISO 8601 format"), null);
  }
  // check if X-Ray Required
  if('require_xray' in appointmentOptions){
    if(appointmentOptions.require_xray)
      apptParams.push(1);
  }
  
  if('consult' in appointmentOptions){
    apptParams.push(appointmentOptions['consult']);
  }
  
  if('level' in appointmentOptions){
    apptParams.push(appointmentOptions['level']);
  }
  
  console.log("Calling Appt with these params: "+apptParams);
  
  // call the RPC with the appointment options sent from User
  vista.callRpc(
    vistaconfig.logger, 
    configuration, 
    'SD APPOINTMENT MAKE', 
    apptParams, 
    function(error, result){
      if(result instanceof Error){
        callback(result, null);
      }else{
        if(!result){
          callback(new Error("Appointment Error: "+result), null);
        }else if(result.indexOf('0') != -1 || result.indexOf('ERROR') != -1){
          callback(new Error("Appointment Error: "+result), null);
        }else if(result.indexOf('1') != -1){
          callback(error, {success: true});
        }else{
          callback(error, {unparseable: result});
        }
        
      }
    }
  );
}

