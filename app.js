require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

    

// Our routes go here:

//To homepage
app.get("/", (req, res, next) => res.render("index"));

//To artist page
app.get("/artist-search", (req, res) => {
  const { artistName } = req.query;

  spotifyApi
    .searchArtists(artistName)
    .then((data) => {
      res.render("artist-search", { artist: data.body.artists.items });
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

 //To albums page
app.get('/albums/:id', (req, res) => {
  const { id } = req.params;
  spotifyApi
  .getArtistAlbums(id)
  .then((data) => {
    res.render("albums",  data.body );
  })
  .catch((err) =>
    console.log("The error while searching artists occurred: ", err)
  );
});

//To track page

app.get('/tracks/:id', (req, res) => {
  const { id } = req.params;
  spotifyApi
  .getAlbumTracks(id)
  .then((data) => {
    res.render("tracks",  data.body );
  })
  .catch((err) =>
    console.log("The error while searching artists occurred: ", err)
  );
});


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));