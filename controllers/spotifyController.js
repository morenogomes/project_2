const express = require('express')
var path = require("path");
var Spotify = require('node-spotify-api');
const app = express()
const PORT = 3000;

var spotify = new Spotify({
    id: '96cba94b0188420d9b0947302e101419',
    secret: 'd6d4076155934e91b382b9d192b9bd3d'
});

// app.use(express.static('public'));

// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "./public/signup.html"));
// });

// app.get("/signin", function (req, res) {
//     res.sendFile(path.join(__dirname, "./public/signin.html"));
// });

// app.get("/playlist", function (req, res) {
//     res.sendFile(path.join(__dirname, "./public/app.html"));
// });

let track = "dont rush"
let artist = "rihanna"
let album = "courage"

app.get('/api/track', (req, res) => {
    spotify
        .request('https://api.spotify.com/v1/search?query=' + track + '&type=track&offset=0&limit=2')
        .then(function (response) {
            res.json({ msg: response });
        })

})

app.get('/api/artist', (req, res) => {
    spotify
        .request('https://api.spotify.com/v1/search?query=' + artist + '&type=artist&offset=0&limit=2')
        .then(function (response) {
            res.json({ msg: response });
        })

})

app.get('/api/album', (req, res) => {
    spotify
        .request('https://api.spotify.com/v1/search?query=' + album + '&type=album&offset=0&limit=2')
        .then(function (response) {
            res.json({ msg: response });
        })

})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/error.html"));
});