const http = require('http');
const fs = require('fs');

var options = {
  host: 'localhost',
  port: '2501',
  path: '/schema',
  method: 'GET'
}
var req = http.request(options, function(response) {
  var responseString = '';

  response.on('data', function(data) {
    responseString += data;
  });
  response.on('end', function() {
    fs.writeFileSync(__dirname + '/schema.graphql', responseString);
  });
});
req.write("");
req.end();