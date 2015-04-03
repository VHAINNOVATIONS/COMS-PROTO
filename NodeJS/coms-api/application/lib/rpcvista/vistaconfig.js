var bunyan = require('bunyan');

exports.logger = bunyan.createLogger({
  name: 'coms-vista',
  streams: [
    {
      level: 'error',
      stream: process.stdout            // log INFO and above to stdout
    }
  ]
});

var context = 'OR CPRS GUI CHART';

exports.configuration = {
    context: context,
    host: '54.83.44.110',
    port: 9300,
//    accessCode: 'CPRS1234',
//    verifyCode: 'CPRS4321$',
    localIP: '192.168.1.28',
    localAddress: 'localhost'
};


