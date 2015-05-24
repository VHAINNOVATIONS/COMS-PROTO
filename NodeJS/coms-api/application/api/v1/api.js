var express = require('express');
var router = express.Router();
var winston = require('winston');

var patient = require('./patient');
var authenticate = require('./authenticate');
var clinics = require('./clinics');
var appt = require('./appointments');
var user = require('./user');
var vitals = require('./vitals');
var medication = require('./medication');
var order = require('./order');
var utilities = require('./utilities');
/**
* List of valid API keys and secrets
*
*/
var apikeys = {};
apikeys['2M13I6Bi0BE3ivVb6TF2W99t847C74DL'] = { user: "experian", secret: "977E874766AB5B6EC998964D27FD8" };
apikeys['dbittest'] = { user: "dbitpro", secret: "dbitpro" };

/**
* Verify that request has a valid access token
*/
router.use(function (req, res, next) {
  var apiKey = req.get('X-Access-Token');
  winston.log('info','Checking Headers', apiKey);
  if(apiKey && apikeys[apiKey] && (apikeys[apiKey].secret == req.get('X-Token-Secret'))){
    next();
  }else{
    res.status(401).json({error: "Invalid Access Token or Secret"});
  }
});

/* 
* Authenticate user into Vista
*/ 
router.post('/authenticate', function(req, res){
  authenticate.verify(req.body.accesscode, req.body.verifycode, function(error,result){
    if( error ){
     res.status(401).json({
       error: error.message
     }); 
    }else{
      res.status(200).json({
        success: result.greeting
      });
    }
  });
});


// get patient by last five
router.get('/patient/lastfive/:lastfive', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  // expect domain to be a comma delimited URL encoded req param
  var domainOptions = null;
  if(req.query.domain){
    domainOptions = req.query.domain.split(",");
  }
  
  patient.findPatientByLastFive(loginOptions, req.params.lastfive, function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
})

// get patient by SSN
router.get('/patient/ssn/:ssn', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  // expect domain to be a comma delimited URL encoded req param
  var domainOptions = null;
  if(req.query.domain){
    domainOptions = req.query.domain.split(",");
  }
  
  patient.findPatientBySSN(loginOptions, req.params.ssn, function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
});

// Patient API 
router.get('/patient/:patient', function(req, res) {
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  // expect domain to be a comma delimited URL encoded req param
  var domainOptions = null;
  if(req.query.domain){
    domainOptions = req.query.domain.split(",");
  }
  
  patient.selectPatient(loginOptions, req.params.patient, function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
});

// get details about a patient
router.get('/patient/details/:patient', function(req,res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  patient.getVirtualPatientRecord(loginOptions, req.params.patient, req.params.filter, function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
  
});

// Find patient by name
router.get('/patient/name/:name', function(req, res) {
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  patient.findPatientByName(loginOptions, req.params.name, function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
});

router.get('/patients', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  patient.getAllPatients(loginOptions,  function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
});

// Find patient by name
router.get('/patient/medications/:id', function(req, res) {
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  patient.getMedicationsForPatient(req.params.id, loginOptions, function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
});

// Find patient by name
router.get('/patient/medication/detail/:id/:medicationien', function(req, res) {
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  patient.getMedicationDetailForPatient(req.params.id, req.params.medicationien, loginOptions, function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
});

router.get('/clinics', function(req,res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  clinics.getAll(loginOptions, function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
});

router.get('/clinic/availability/:id', function(req,res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  clinics.getAvailability(req.params.id, loginOptions, function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
});

router.get('/clinic/details/:id', function(req,res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  clinics.getDetails(req.params.id, loginOptions, function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
});


router.get('/appointment/scheduling_request_types', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  appt.getSchedulingRequestTypes(loginOptions, function(error, result){
    if(error){
      res.status(500).json(error);
    }else{
      res.status(200).json(result);
    }
  });
});

// schedule appointment
router.post('/appointment/make',function(req,res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      console.log("Error: "+error);
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  appt.make(loginOptions, req.body,  callback);
  
  
});

router.get('/patient/vitals/:patient', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {error: error.message}
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  patient.getVitals(req.params.patient, loginOptions,  callback);
});

router.post('/patient/vital/add', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  patient.addVital(req.body, loginOptions,  callback);
});

router.get('/vital/codes', function(req,res){
  var vital_codes = new Array();
  for( code in vitals.vital_codes){
    vital_codes.push({code: code, description: vitals.vital_codes[code].desc});
  }
  res.status(200).json(vital_codes);
});

router.get('/user/info', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  user.getInfo(loginOptions,  callback);
});

router.get('/users/:name', function(req, res){
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  user.findUserByName(loginOptions, req.params.name, callback);
});


router.get('/medication/name/:name', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  medication.findByName(loginOptions, req.params.name, callback);
});

router.get('/medications/inpatient', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  medication.getInPatient(loginOptions, callback);
});

router.get('/medications/outpatient', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  medication.getOutPatient(loginOptions, callback);
});


router.get('/order/info/:patient/:medicationid', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  medication.getOrderInfo(loginOptions, req.params.medicationid, req.params.patient, callback);
});



// get Order Dialog IEN by name
router.get('/order/dialogien/:name', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  order.getDialogIENByName(loginOptions, req.params.name, callback);
});

// get Order Dialog IEN by name
router.get('/order/dialog/ien/:ien', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  order.getDialogByIEN(loginOptions, req.params.ien, callback);
});

// get Order Dialog IEN by name
router.get('/order/dialog/name/:name', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  order.getDialogByName(loginOptions, req.params.name, callback);
});


router.post('/order/new', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  // make an appointment
  order.saveOrder(loginOptions, req.body, callback);
});

router.get('/current/date', function(req, res){
  // get login options
  var loginOptions = {
    accessCode: req.get('X-ACCESS-CODE'),
    verifyCode: req.get('X-VERIFY-CODE') 
  }
  
  var callback = function(error, result){
    if(error){
      res.status(500).json(
        {
          error: error.message
        }
      );
    }else{
      res.status(200).json(result);
    }
  }
  
  utilities.currentDate(loginOptions, callback);
  
});


module.exports = router;