// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", function (req, res) {
  
  let userAgent = req.get('User-Agent');
  let os = userAgent.substring(userAgent.indexOf('(') + 1,
                               userAgent.indexOf(')'));
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  ip = ip.substr(0,15)

  let data = {
    'ip': ip,
    'lang': req.get('Accept-Language').split(',')[0],
    'os': os
  }
  console.log(data);
  res.json(data);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
