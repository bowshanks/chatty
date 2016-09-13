var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var messages = [];

var responseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};
function getMonthAbbrev(month) {
  var abbrev;
  switch(month){
    case 0: abbrev = 'Jan';
    break;
    case 1: abbrev = 'Feb';
    break;
    case 2: abbrev = 'Mar';
    break;
    case 3: abbrev = 'Apr';
    break;
    case 4: abbrev = 'May';
    break;
    case 5: abbrev = 'Jun';
    break;
    case 6: abbrev = 'Jul';
    break;
    case 7: abbrev = 'Aug';
    break;
    case 8: abbrev = 'Sep';
    break;
    case 9: abbrev = 'Oct';
    break;
    case 10: abbrev = 'Nov';
    break;
    case 11: abbrev = 'Dec';
    break;
  }
  return abbrev;
}

function parseTime(time){
  return ('0' + time.getDate()).slice(-2) + ' ' +
  getMonthAbbrev(time.getMonth()) + ' ' +
  time.getFullYear() + ' ' +
  ('0' + time.getHours()).slice(-2) + ':' +
  ('0' + time.getMinutes()).slice(-2) + ':' +
  ('0' + time.getSeconds()).slice(-2)
}

app.use(bodyParser.json())

app.options('/', function(req,res,next){
  res.writeHead(200, responseHeaders);
  res.send();
});

app.get('/',function(req,res,next){
  res.status(200).set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' devmountain.github.io"
  }).send(JSON.stringify(messages));

});

app.post('/',function(req,res,next){
  var time = new Date();
  req.body.time = parseTime(time);
  messages.push(req.body);
  console.log(messages)
  res.status(200).set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' devmountain.github.io"
  }).send(JSON.stringify(messages));
});

app.listen('8989',function() {
  console.log('chatty server initiated')
})
