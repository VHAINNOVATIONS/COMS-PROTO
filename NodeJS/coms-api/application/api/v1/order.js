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


/*
ORWDX SAVE
 
Params ------------------------------------------------------------------
literal	100104 // dfn
literal	1 // provider
literal	11 // order location / clinic ien
literal	PSJ OR PAT OE // order dialog
literal	23 // display group
literal	129 // dialog IEN
literal	// order apointment
list	
	(4,1)=1527 // drug id
	(136,1)=20MG/5ML // dosage
	(138,1)=898 // drug
	(386,1)=20&MG/5ML&5&&20MG/5ML&898&4& // dosage string
	(137,1)=270 // route IEN
	(170,1)=MO-TU-WE@1200 // date time
	(15813,1)=1200 // time
	(716,1)=C // schedule class
	(7,1)=9 // Urgency
	(15,1)=ORDIALOG("WP",15,1) // not sure
	(1359,1)= // first dose now
	(385,1)=ORDIALOG("WP",385,1) // signature
	("WP",385,1,1,0)=20MG/5ML IVP MO-TU-WE@1200 // dosage, route, date time
	("ORCHECK")=2 // not sure
	("ORCHECK","NEW","2","1")=99^2^Remote Order Checking not available - checks done on local data only // not sure
	("ORCHECK","NEW","2","2")=25^2^||63616,45407,NEW&These checks could not be completed for this patient: / not sure
	("ORTS")=9 // not sure
literal	
literal	
literal	
literal	0

// order options
{
  dfn
  provider
  clinic
  ordertype - inpatient, outpatient
  drug ien
  dosage : {
    name:
    vista_id:
  }
  route : {
    ien:
    name:
  }
  administration_time : 24 hour time
  administration_days : [ 0, 1 , 2 ,3 ] 0 - based day index
}

*/
exports.saveOrder = function(loginOptions, orderOptions, callback){
  var configuration = vistaconfig.configuration;
  for(var option in loginOptions){
    configuration[option] = loginOptions[option];
  }
  var params = orderhelper.convertOrderToVistaOrderParams(orderOptions);
  console.log("Params: "+params);
  vista.callRpc(vistaconfig.logger, configuration, 'ORWDX SAVE', params, function(error, result){
    if(result instanceof Error){
      callback(result, null);
    }else{
      callback(error, orderhelper.parseSaveOrderResult(result));
    }
  });
  
}


