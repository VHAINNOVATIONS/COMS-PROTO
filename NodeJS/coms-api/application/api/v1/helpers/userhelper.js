var _str = require("underscore.string");

function parseUserLine(line){
  var user = {};
  line.split('^').forEach(function(currentValue, index){
    if(currentValue){
      if(index == 0){
        user.duz = currentValue;
      }else if(index == 1){
        user.name = currentValue;
      }else if(index == 2){
        user.role = _str.trim(_str.ltrim(currentValue, '-'));
      }
    }
  });
  return user;
}

exports.parseUserData = function(data){
  var userList = [];
  data.split('\r\n').forEach(function(currentValue){
    if(currentValue)
      userList.push(parseUserLine(currentValue));
  });
  return userList;
}
