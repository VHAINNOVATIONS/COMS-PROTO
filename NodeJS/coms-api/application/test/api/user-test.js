
var userhelper = require('../../api/v1/helpers/userhelper');
var expect = require('chai').expect

var assert = require("assert")
describe('User Helper', function(){
  describe('#parseUserLine()', function(){
    it('Should Return a correctly parsed string', function(){
      var testData = '10000000090^Clincoordinator,Five^- Scholar Extraordinaire\r\n10000000089^Clincoordinator,Four^- Scholar Extraordinaire\r\n10000000086^Clincoordinator,One^- Scholar Extraordinaire\r\n10000000088^Clincoordinator,Three^- Scholar Extraordinaire\r\n10000000087^Clincoordinator,Two^- Scholar Extraordinaire\r\n10000000177^Eyedoc,Eyedocone\r\n10000000178^Imager,Imagerone\r\n10000000210^Innovations,Vha\r\n10000000049^Labtech,Fiftynine\r\n10000000077^Labtech,Five^- COMPUTER SPECIALIST\r\n11624^Labtech,Four^- COMPUTER SPECIALIST\r\n10000000052^Labtech,One^- COMPUTER SPECIALIST\r\n10000000076^Labtech,Three^- COMPUTER SPECIALIST\r\n20389^Labtech,Twentytwo^- Scholar Extraordinaire\r\n10000000053^Labtech,Two^- COMPUTER SPECIALIST\r\n10000000187^Pcmm-Md,Five^- PCMM PROVIDER\r\n10000000186^Pcmm-Md,Four^- PCMM PROVIDER\r\n10000000183^Pcmm-Md,One^- PCMM PROVIDER\r\n10000000185^Pcmm-Md,Three^- PCMM PROVIDER\r\n10000000184^Pcmm-Md,Two^- PCMM PROVIDER\r\n10000000192^Pcmm-Np,Five^- PCMM PROVIDER\r\n10000000191^Pcmm-Np,Four^- PCMM PROVIDER\r\n10000000188^Pcmm-Np,One^- PCMM PROVIDER\r\n10000000190^Pcmm-Np,Three^- PCMM PROVIDER\r\n10000000189^Pcmm-Np,Two^- PCMM PROVIDER\r\n10000000197^Pcmm-Pa,Five^- PCMM PROVIDER\r\n10000000196^Pcmm-Pa,Four^- PCMM PROVIDER\r\n10000000193^Pcmm-Pa,One^- PCMM PROVIDER\r\n10000000195^Pcmm-Pa,Three^- PCMM PROVIDER\r\n10000000194^Pcmm-Pa,Two^- PCMM PROVIDER\r\n10000000202^Pcmm-Resident,Five^- PCMM PROVIDER\r\n10000000201^Pcmm-Resident,Four^- PCMM PROVIDER\r\n10000000198^Pcmm-Resident,One^- PCMM PROVIDER\r\n10000000200^Pcmm-Resident,Three^- PCMM PROVIDER\r\n10000000199^Pcmm-Resident,Two^- PCMM PROVIDER\r\n1^Programmer,One^- COMPUTER SPECIALIST\r\n991^Provider,Eight^- Scholar Extraordinaire\r\n1002^Provider,Eighteen^- Scholar Extraordinaire\r\n9005^Provider,Eighty^- Scholar Extraordinaire\r\n9013^Provider,Eightyeight^- Scholar Extraordinaire\r\n9010^Provider,Eightyfive^- Scholar Extraordinaire\r\n9009^Provider,Eightyfour^- Scholar Extraordinaire\r\n9014^Provider,Eightynine^- Scholar Extraordinaire\r\n9006^Provider,Eightyone^- Scholar Extraordinaire\r\n';
      console.log(userhelper.parseUserData(testData));
    })
  }),
  describe("#parseUserData()", function(){
    it('Should Return a correctly parsed string', function(){
      var testData = '10000000090^Clincoordinator,Five^- Scholar Extraordinaire';
      var testData2 = '10000000089^Clincoordinator,Four^- Scholar Extraordinaire';
      var testData3 = '10000000086^Clincoordinator,One^- Scholar Extraordinaire';
      var testData4 = '10000000087^Clincoordinator,Two^- Scholar Extraordinaire';
      console.log(userhelper.parseUserLine(testData));
      console.log(userhelper.parseUserLine(testData2));
      console.log(userhelper.parseUserLine(testData3));
      console.log(userhelper.parseUserLine(testData4));
    })
  })
});