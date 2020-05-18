const request     = require('request');
const querystring = require('querystring');

const SPOTIFY_CLIENT_ID     = '96cba94b0188420d9b0947302e101419';
const SPOTIFY_CLIENT_SECRET = 'd6d4076155934e91b382b9d192b9bd3d';

module.exports = function (app) {

  let redirect_uri =
    process.env.REDIRECT_URI ||
    'https://stark-woodland-75959.herokuapp.com/app'

  app.get('/login', function (req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope: ['streaming'],
        redirect_uri,
      }))
  })

  app.get('/token/:access_code', function (req, res) {
    console.log("We are in the function to get token = ", req.params.access_code)
    let code = req.params.access_code || null
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(
          SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
        ).toString('base64'))
      },
      json: true
    }
    request.post(authOptions, function (error, response, body) {

      res.json(body);

    })

  })

}