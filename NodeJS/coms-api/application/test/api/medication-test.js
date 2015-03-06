
var orderhelper = require('../../api/v1/helpers/orderhelper');
var expect = require('chai').expect

var assert = require("assert")
describe('Order Helper', function(){
  describe('#parseMedicationOrderDetails()', function(){
    it('Should Return a correctly parsed string', function(){
      var testData = '~Medication\r\nd1527^DEXAMETHASONE INJ,SOLN \r\n~Verb\r\ndINJECT\r\n~Preposition\r\nd\r\n~AllDoses\r\ni4MG/1ML^898^4&MG/1ML&1&&4MG/1ML&898&4&\r\ni6MG/1.5ML^898^6&MG/1.5ML&1.5&&6MG/1.5ML&898&4&\r\ni8MG/2ML^898^8&MG/2ML&2&&8MG/2ML&898&4&\r\ni10MG/2.5ML^898^10&MG/2.5ML&2.5&&10MG/2.5ML&898&4&\r\ni12MG/3ML^898^12&MG/3ML&3&&12MG/3ML&898&4&\r\ni16MG/4ML^898^16&MG/4ML&4&&16MG/4ML&898&4&\r\ni20MG/5ML^898^20&MG/5ML&5&&20MG/5ML&898&4&\r\n~Dosage\r\niDEXAMETHASONE 4MG/ML INJ 5ML^4^^4&MG/1ML&1&&4MG/1ML&898&4&^4MG/1ML^0.5248^^VI\r\niDEXAMETHASONE 4MG/ML INJ 5ML^4^^6&MG/1.5ML&1.5&&6MG/1.5ML&898&4&^6MG/1.5ML^0.7872^^VI\r\niDEXAMETHASONE 4MG/ML INJ 5ML^4^^8&MG/2ML&2&&8MG/2ML&898&4&^8MG/2ML^1.0496^^VI\r\niDEXAMETHASONE 4MG/ML INJ 5ML^4^^10&MG/2.5ML&2.5&&10MG/2.5ML&898&4&^10MG/2.5ML^1.312^^VI\r\niDEXAMETHASONE 4MG/ML INJ 5ML^4^^12&MG/3ML&3&&12MG/3ML&898&4&^12MG/3ML^1.5744^^VI\r\niDEXAMETHASONE 4MG/ML INJ 5ML^4^^16&MG/4ML&4&&16MG/4ML&898&4&^16MG/4ML^2.0992^^VI\r\niDEXAMETHASONE 4MG/ML INJ 5ML^4^^20&MG/5ML&5&&20MG/5ML&898&4&^20MG/5ML^2.624^^VI\r\n~Dispense\r\ni898^4^^DEXAMETHASONE 4MG/ML INJ 5ML^1\r\n~Route\r\ni270^IV PUSH^IVP^IV PUSH^1\r\nd270^IV PUSH\r\n~Schedule\r\n~Guideline\r\n~Message\r\n~DEASchedule\r\nd\r\n';
      console.log(orderhelper.parseMedicationOrderDetails(testData));
    })
  }),
  describe('#parseMedicationDetails()', function(){
    it("Should return ien: 1527 and name: DEXAMETHASONE INJ,SOLN", function(){
      var testData = 'd1527^DEXAMETHASONE INJ,SOLN ';
      var result = orderhelper.parseMedicationDetails(testData);
      expect(result).to.have.property('ien','1527');
      expect(result).to.have.property('name','DEXAMETHASONE INJ,SOLN');
    })
  }),
  describe('#parseRoute()', function(){
    it("Should return ien: 270 and name: IV PUSH", function(){
      var testFormControlData = 'i270^IV PUSH^IVP^IV PUSH^1';
      var testDefinition = 'd270^IV PUSH';
      var defResult = orderhelper.parseRoute(testDefinition);
      expect(defResult).to.have.property('ien','270');
      expect(defResult).to.have.property('name','IV PUSH');
      
      var formControlResult = orderhelper.parseRoute(testFormControlData);
      expect(formControlResult).to.not.be.ok;
    })
  }),
  describe('#parseOrderDialog()', function(){
    it("Should return Order Options", function(){
      var testData = 'Inpatient Medications^8^^^^\r\n^1^P^4^0^^Medication: ^^\r\n^2^P^136^0^^Dose: ^^\r\n1^2^P^137^0^^Route: ^^\r\n2^2^P^170^0^^Schedule: ^^\r\n^8^P^7^0^^Priority: ^^\r\n^10^P^15^0^^Comments: ^^\r\n1^1^P^384^0^^Strength: ^^\r\n5^5^P^149^0^^Quantity: ^^\r\n^7^P^148^0^^Pick Up: ^^\r\n^6^P^150^0^^Refills: ^^\r\n^9^P^151^0^^Is this medication for a SC condition? ^^\r\n3^2^P^153^0^^How long: ^^\r\n^4^P^6^0^^Start: ^^\r\n^3^P^385^0^^Text: ^^\r\n5^2^P^386^0^^Dose: ^^\r\n6^2^P^138^0^^Dispense Drug: ^^\r\n^5^P^387^0^^Days Supply: ^^\r\n5^1^P^1350^0^^Dispense Drug: ^^\r\n4^2^P^388^0^^And/then/except: ^^\r\n5^3^P^1358^0^^Patient Instructions: ^^\r\n5^4^P^1359^0^^First Dose: ^^\r\n7^2^P^15813^0^^Administration Times: ^^\r\n8^2^P^716^0^^Schedule Type:^^\r\n';
      var result = orderhelper.parseOrderDialog(testData);
      console.log(result);
    })
  }),
  describe('#convertOrderToVistaOrderParams()', function(){
    it("Should return Order Options", function(){
      var order = {
          "dfn": "100025",
          "provider": "1",
          "clinic": "11",
          "type": "inpatient",
          "drug": "1527",
          "dosage" : "200MG/5ML",
          "route" : {
            "ien": "270",
            "code": "IVP"
          },
          "administration_time" : "1350",
          "administration_days" : [ 0, 1 , 2 ,3 ]
      };
      var result = orderhelper.convertOrderToVistaOrderParams(order);
      console.log(result);
    })
  }),
  describe('#parseSaveOrderResult()', function(){
    it("Should return ien: 38293", function(){
      var testData = '~38293;1^23^3150306.1239^^^11^2^^^1^PROGRAMMER,ONE^^0^^^CP1234563^^^BCMA:11^^0^0^0^0\r\ntDEXAMETHASONE INJ,SOLN \r\nt200MG/1ML IVP QID *UNSIGNED*\r\n';
      var result = orderhelper.parseSaveOrderResult(testData);
      expect(result).to.have.property('ien','38293');;
    })
  })
});