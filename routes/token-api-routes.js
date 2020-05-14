let request = require('request')
let querystring = require('querystring')

const SPOTIFY_CLIENT_ID = '96cba94b0188420d9b0947302e101419'
const SPOTIFY_CLIENT_SECRET = 'd6d4076155934e91b382b9d192b9bd3d'

module.exports = function (app) {

  let redirect_uri =
    process.env.REDIRECT_URI ||
    'http://stormy-reaches-70588.herokuapp.com/app'

  app.get('/login', function (req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope: ['streaming'],
        redirect_uri
      }))
  })

  app.get('/app', function (req, res) {
    let code = req.query.code || null
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

      var access_token = body.access_token
      let uri = process.env.FRONTEND_URI || 'http://stormy-reaches-70588.herokuapp.com/'
      res.redirect(uri + '?access_token=' + access_token)

    })
  })
}