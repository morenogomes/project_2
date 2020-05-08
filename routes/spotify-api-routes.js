const express = require('express')
const path = require("path");
const Spotify = require('node-spotify-api');
const app = express()

var spotify = new Spotify({
    id: '96cba94b0188420d9b0947302e101419',
    secret: 'd6d4076155934e91b382b9d192b9bd3d'
});

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