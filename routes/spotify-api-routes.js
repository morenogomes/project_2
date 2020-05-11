// Requiring models
var db = require("../models");

const Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id:     '96cba94b0188420d9b0947302e101419',
    secret: 'd6d4076155934e91b382b9d192b9bd3d'
});

module.exports = function(app) {
  // API Functions
  // ============================================================= 
  // Serach Artist Route
  app.post("/api/searchartist", function(req, res) {
    spotify
    .request('https://api.spotify.com/v1/search?query=' + req.body.artist + '&type=artist&offset=0&limit=2')
    .then(function (response) {
        res.json(response);
    }) 
    .catch(function(err) {
      // Redirect to Error page
      res.status(404).json(err);
    });
  });

  // Serach Song Route
  app.post("/api/searchsong", function(req, res) {
    spotify
    .request('https://api.spotify.com/v1/search?query=' + req.body.song + '&type=track&offset=0&limit=2')
    .then(function (response) {
        res.json(response);
    }) 
    .catch(function(err) {
      // Redirect to Error page
      res.status(404).json(err);
    });
  });

  // Serach Album Route
  app.post("/api/searchalbum", function(req, res) {
    spotify
    .request('https://api.spotify.com/v1/search?query=' + req.body.album + '&type=album&offset=0&limit=2')
    .then(function (response) {
        res.json(response);
    }) 
    .catch(function(err) {
      // Redirect to Error page
      res.status(404).json(err);
    });
  });

  // SQL Functions
  // =============================================================
  // Add Playlist Route: If the information is added successfully, proceed to log the user in, otherwise send back an error
  app.post("/api/addplaylist", function(req, res) {
    let databaseOS;
    let tableOS;
    // Types: SONG = 1  |  ARTIST = 2  |  ALBUM = 3
    switch (parseInt(req.body.type)){
      case 1:
        databaseOS = db.Playlist;
        tableOS    = {
          songName   : req.body.field1,
          artistName : req.body.field2,
          albumImage : req.body.field3,
          trackURI   : req.body.field4
        }
        break;
      case 2:
        databaseOS = db.Artist;
        tableOS    = {
          artistName  : req.body.field1,
          artistImage : req.body.field2,
          genre       : req.body.field3
        }
        break;
      case 3:
        databaseOS = db.Album;
        tableOS    = {
          albumName  : req.body.field1,
          albumImage : req.body.field2,
          artistName : req.body.field3
        }
        break;
      default:
        // Redirect to Error page
        res.status(404).json(err);
        break;
    }
    databaseOS.create(tableOS)
      .then(function() {
        res.json({});
      })
      .catch(function(err) {
        // Redirect to Error page
        res.status(404).json(err);
      });
  });
}