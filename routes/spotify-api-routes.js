// const express = require('express')
const path = require("path");
const Spotify = require('node-spotify-api');
// const app = express()

var spotify = new Spotify({
    id: '96cba94b0188420d9b0947302e101419',
    secret: 'd6d4076155934e91b382b9d192b9bd3d'
});

let track = "my heart will go on"
let artist = "rihanna"
let album = "take care"

module.exports = function(app) {

// app.get('/api/track', (req, res) => {
//     spotify
//         .request('https://api.spotify.com/v1/search?query=' + track + '&type=track&offset=0&limit=2')
//         .then(function (response) {
//             res.json(response);
//             console.log("Name of Song: ", response.tracks.items[0].name.toUpperCase());
//             console.log("Name of Artist: ", response.tracks.items[0].album.artists[0].name.toUpperCase());
//             console.log("Album Image: ", response.tracks.items[0].album.images[0].url);
//             console.log("Audio File: ", response.tracks.items[0].uri);
//         })

// })

// app.get('/api/artist', (req, res) => {
//     spotify
//         .request('https://api.spotify.com/v1/search?query=' + artist + '&type=artist&offset=0&limit=2')
//         .then(function (response) {
//             res.json(response);
//             console.log("Name of Artist: ", response.artists.items[0].name.toUpperCase());
//             console.log("Genre: ", response.artists.items[0].genres[0].toUpperCase());
//             console.log("Artist Image: ", response.artists.items[0].images[0].url);
//         })

// })

// app.get('/api/album', (req, res) => {
//     spotify
//         .request('https://api.spotify.com/v1/search?query=' + album + '&type=album&offset=0&limit=2')
//         .then(function (response) {
//             res.json(response);
//             console.log("Name of Artist: ", response.albums.items[0].artists[0].name.toUpperCase());
//             console.log("Name of Album: ", response.albums.items[0].name.toUpperCase());
//             console.log("Name of Album: ", response.albums.items[0].images[0].url);
//         })

// })

 // Serach Artist Route
 app.post("/api/searchartist", function(req, res) {
    spotify
    .request('https://api.spotify.com/v1/search?query=' + req.body.artist + '&type=artist&offset=0&limit=2')
    .then(function (response) {
        res.json(response);
    }) .catch(function(err) {
        res.status(401).json(err);
        // res.redirect(404, "/error");
      });
    
  });

  app.post("/api/searchsong", function(req, res) {
    spotify
    .request('https://api.spotify.com/v1/search?query=' + req.body.song + '&type=track&offset=0&limit=2')
    .then(function (response) {
        res.json(response);
    }) .catch(function(err) {
        res.status(401).json(err);
        // res.redirect(404, "/error");
      });
    
  });

  app.post("/api/searchalbum", function(req, res) {
    spotify
    .request('https://api.spotify.com/v1/search?query=' + req.body.album + '&type=album&offset=0&limit=2')
    .then(function (response) {
        res.json(response);
    }) .catch(function(err) {
        res.status(401).json(err);
        // res.redirect(404, "/error");
      });
    
  });
}