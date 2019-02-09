require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


cmd = process.argv[2];
searchValue = process.argv[3];

getCmd(cmd)

console.log(keys);
console.log(cmd)
console.log(spotify);

var bandCmd = 'concert-this'

var spotifyCmd = 'spotify-this-song'

var movieCmd = 'movie-this'

var doitCmd = 'do-what-it-says'

    var omdbApi = keys.omdbApiKey.id;
    console.log(omdbApi)

var movieURL = `http://www.omdbapi.com/?t=${searchValue}&y=&plot=short&apikey=${omdbApi}`
var bandsURL = `https://rest.bandsintown.com/artists/"${searchValue}"/events?app_id=codingbootcamp`
console.log(bandsURL);
console.log(movieURL);

function getCmd(cmd){
        switch (cmd){
        case bandCmd:
            console.log('this is band');
            console.log(searchValue)
            break;
        case spotifyCmd:
            console.log('this is an actor');
            console.log(searchValue)
            break;
       case movieCmd:
        console.log('move')
        console.log(searchValue)
        break;
       case doitCmd:
       console.log('doit')
    }
}

getSpotifySong('Boom')

function getSpotifySong(){
    spotify
  .search({ type: 'text', query: `${searchValue}` })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
}