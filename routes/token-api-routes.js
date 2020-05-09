var request = require('request');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/token', function(req, resp) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'X-Requested-With');

  var client_id = '96cba94b0188420d9b0947302e101419';
  var client_secret = 'd6d4076155934e91b382b9d192b9bd3d';

  // your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      resp.json({ token: body.access_token });
      console.log('Here is the new token: ', body.access_token)
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('App listening on http://localhost:' + app.get('port') + '/token');
});