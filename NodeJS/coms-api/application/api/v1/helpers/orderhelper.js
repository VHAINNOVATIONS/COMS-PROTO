


// All functions relating to creating an order

var _str = require("underscore.string");


/*
~Medication
d1527^DEXAMETHASONE INJ,SOLN 
~Verb
dINJECT
~Preposition
d
~PtInstr
~AllDoses
i4MG/1ML^898^4&MG/1ML&1&&4MG/1ML&898&4&
i6MG/1.5ML^898^6&MG/1.5ML&1.5&&6MG/1.5ML&898&4&
i8MG/2ML^898^8&MG/2ML&2&&8MG/2ML&898&4&
i10MG/2.5ML^898^10&MG/2.5ML&2.5&&10MG/2.5ML&898&4&
i12MG/3ML^898^12&MG/3ML&3&&12MG/3ML&898&4&
i16MG/4ML^898^16&MG/4ML&4&&16MG/4ML&898&4&
i20MG/5ML^898^20&MG/5ML&5&&20MG/5ML&898&4&
~Dosage
iDEXAMETHASONE 4MG/ML INJ 5ML^4^^4&MG/1ML&1&&4MG/1ML&898&4&^4MG/1ML^0.5248^^VI
iDEXAMETHASONE 4MG/ML INJ 5ML^4^^6&MG/1.5ML&1.5&&6MG/1.5ML&898&4&^6MG/1.5ML^0.7872^^VI
iDEXAMETHASONE 4MG/ML INJ 5ML^4^^8&MG/2ML&2&&8MG/2ML&898&4&^8MG/2ML^1.0496^^VI
iDEXAMETHASONE 4MG/ML INJ 5ML^4^^10&MG/2.5ML&2.5&&10MG/2.5ML&898&4&^10MG/2.5ML^1.312^^VI
iDEXAMETHASONE 4MG/ML INJ 5ML^4^^12&MG/3ML&3&&12MG/3ML&898&4&^12MG/3ML^1.5744^^VI
iDEXAMETHASONE 4MG/ML INJ 5ML^4^^16&MG/4ML&4&&16MG/4ML&898&4&^16MG/4ML^2.0992^^VI
iDEXAMETHASONE 4MG/ML INJ 5ML^4^^20&MG/5ML&5&&20MG/5ML&898&4&^20MG/5ML^2.624^^VI
~Dispense
i898^4^^DEXAMETHASONE 4MG/ML INJ 5ML^1
~Route
i270^IV PUSH^IVP^IV PUSH^1
d270^IV PUSH
~Schedule
~Guideline
~Message
~DEASchedule
*/
exports.parseMedicationOrderDetails = function(orderDetailStr){
  var line_sep = "\r\n";
  var result = {};
  var currentGroup = null;
  orderDetailStr.split(line_sep).forEach(function(line){
    // Group headings always start with '~'
    if(_str.startsWith(line, "~")){
      currentGroup = line.substring(1, line.length);
      result[currentGroup] = [];
    }else{
      if(currentGroup == "Medication"){
        result[currentGroup] = (parseMedicationDetails(line));
      }else if(currentGroup == "Route"){
        var parsedRoute = parseRoute(line);
        if(parsedRoute){
          result[currentGroup].push(parsedRoute);
        }
      }else{
        result[currentGroup].push(line);
      }

    }
  });
  return result;
}

/*
Parsing this:
d1527^DEXAMETHASONE INJ,SOLN '
*/

function parseMedicationDetails(medicationStr){
  if(medicationStr && medicationStr.length > 0){
    var split = medicationStr.split('^');
    return {ien: split[0].substring(1, split[0].length), name: _str.trim(split[1])};
  }
  return null;
}
exports.parseMedicationDetails = parseMedicationDetails;

/*
2 possible strings:
'i270^IV PUSH^IVP^IV PUSH^1'
'd270^IV PUSH'
*/
function parseRoute(str){
  if(_str.startsWith(str,'i')){
    var split_str = str.split('^');
    return {ien: split_str[0].substring(1,split_str[0].length), name: split_str[1], code: split_str[2]};
  }
  return null;
}
exports.parseRoute = parseRoute;

/*
{
  dfn
  provider
  clinic
  ordertype - inpatient, outpatient
  drug: ien
  dosage : 
  route : {
    ien:
    name:
    code:
  }
  administration_time : 24 hour time
  administration_days : [ 0, 1 , 2 ,3 ] 0 - based day index
}

Vista Order:
[
  '100025',
  '1',
  '11',
  'PSJ OR PAT OE',
  '23',
  '129',
  '',
  {
    '4,1':'1527',
    '136,1':'200MG/1ML',
    '138,1':'',
    '386,1':'',
    '384,1':'',
    '137,1':'270',
    '170,1':'QID',
    '15813,1':'0900-1300-1700-2100',
    '716,1':'C',
    '7,1':'9',
    '15,1':'ORDIALOG("WP",15,1)',
    '1359,1':'',
    '385,1':'ORDIALOG("WP",385,1)',
    '"WP",385,1,1,0':'200MG/1ML IVP QID',
    '"ORCHECK"':'2',
    '"ORCHECK","NEW","2","1"':'99^2^Remote Order Checking not available - checks done on local data only',
    '"ORTS"':'9'
  },
     '',
     '',
     '',
     0
],

*/
exports.convertOrderToVistaOrderParams = function(order){
  // convert order type to vista order dialog
  var order_dialog = {};
  if(order.type == 'inpatient'){
    order_dialog.type = 'PSJ OR PAT OE';
    order_dialog.group_ien = '23';
    order_dialog.ien = '129';
  }
  var weekday = new Array(7);
  weekday[0]=  "SU";
  weekday[1] = "MO";
  weekday[2] = "TU";
  weekday[3] = "WE";
  weekday[4] = "TH";
  weekday[5] = "FR";
  weekday[6] = "SA";
  
  // convert admin date time to vista string
  var day_string = '';
  order.administration_days.forEach(function(day){
    day_string += weekday[day]+'-';
  });
  // remove trailing -
  day_string = day_string.substring(0, day_string.length-1);
  var vistaorderarray =  {
    '4,1': order.drug,
    '136,1': order.dosage,
    '138,1':'',
    '386,1':'',
    '384,1':'',
    '137,1':order.route.ien,
    '170,1': day_string+'@'+order.administration_time,
    '15813,1':order.administration_time,
    '716,1':'C',
    '7,1':'9',
    '15,1':'ORDIALOG("WP",15,1)',
    '1359,1':'',
    '385,1':'ORDIALOG("WP",385,1)',
    '"WP",385,1,1,0': order.dosage+' '+order.route.code + ' '+day_string+'@'+order.administration_time,
    '"ORCHECK"':'2',
    '"ORCHECK","NEW","2","1"':'99^2^Remote Order Checking not available - checks done on local data only',
    '"ORTS"':'9'
  };
  
   return [
    order.dfn,
    order.provider,
    order.clinic,
    order_dialog.type,
    order_dialog.group_ien,
    order_dialog.ien,
    '',
    vistaorderarray,
    '',
    '',
    '',
    0
  ];
}

/*
'~38293;1^23^3150306.1239^^^11^2^^^1^PROGRAMMER,ONE^^0^^^CP1234563^^^BCMA:11^^0^0^0^0\r\ntDEXAMETHASONE INJ,SOLN \r\nt200MG/1ML IVP QID *UNSIGNED*\r\n'
// only going to return order IEN
*/
exports.parseSaveOrderResult = function(result){
  return {ien: _str.ltrim(result.split(';')[0],'~')};
}


/*
Inpatient Medications^8^^^^
^1^P^4^0^^Medication: ^^
^2^P^136^0^^Dose: ^^
1^2^P^137^0^^Route: ^^
2^2^P^170^0^^Schedule: ^^
^8^P^7^0^^Priority: ^^
^10^P^15^0^^Comments: ^^
1^1^P^384^0^^Strength: ^^
5^5^P^149^0^^Quantity: ^^
^7^P^148^0^^Pick Up: ^^
^6^P^150^0^^Refills: ^^
^9^P^151^0^^Is this medication for a SC condition? ^^
3^2^P^153^0^^How long: ^^
^4^P^6^0^^Start: ^^
^3^P^385^0^^Text: ^^
5^2^P^386^0^^Dose: ^^
6^2^P^138^0^^Dispense Drug: ^^
^5^P^387^0^^Days Supply: ^^
5^1^P^1350^0^^Dispense Drug: ^^
4^2^P^388^0^^And/then/except: ^^
5^3^P^1358^0^^Patient Instructions: ^^
5^4^P^1359^0^^First Dose: ^^
7^2^P^15813^0^^Administration Times: ^^
8^2^P^716^0^^Schedule Type:^^
*/

function parseOrderDialog(orderDialogText){
  
  if(orderDialogText){
    var orderDialog = { options : [] };
    orderDialogText.split("\r\n").forEach(function(line, index){
      if(!(_str.isBlank(line))){
        var fields = line.split('^');
        // 0 index element is Dialog Name
        if(index == 0){
          orderDialog['name'] = fields[0];
        }else{
          console.log("Fields: "+fields);
          var orderOption = {};
          if(fields[0]){
            console.log("Should be Setting column: "+fields[0]);
            orderOption['colnum'] = fields[0];
          }
          if(fields[1]){
            orderOption['rownum'] = fields[1];
          }
        
          orderOption['type'] = fields[2];
          orderOption['menuid'] = fields[3];
          orderOption['formid'] = fields[4];
          orderOption['autoaccept'] = (fields[5] == '1');
          orderOption['displaytext'] = fields[6];
          orderOption['mnemonic'] = fields[7];
          orderOption['displayonly'] = (fields[8] == '1');
        
          orderDialog['options'].push(orderOption);
        
        }
      }
    });
    return orderDialog;
  }
  return null;
}

exports.parseOrderDialog = parseOrderDialog;