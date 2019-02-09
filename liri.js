require("dotenv").config();
let axios = require("axios")
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


cmd = process.argv[2];
searchValue = process.argv.slice(3).join(' ');
console.log(searchValue)
console.log('the command ' + cmd);




var bandCmd = 'concert-this';

var spotifyCmd = 'spotify-this-song';

var movieCmd = 'movie-this';

var doitCmd = 'do-what-it-says';

    var omdbApi = keys.omdbApiKey.id;
   // console.log(omdbApi)
var bandsURL = `https://rest.bandsintown.com/artists/${searchValue}/events?app_id=codingbootcamp`
var movieURL = `http://www.omdbapi.com/?t=${searchValue}&y=&plot=short&apikey=${omdbApi}`
//var bandsURL = `https://rest.bandsintown.com/artists/"${searchValue}"/events?app_id=codingbootcamp`
console.log(bandsURL);
console.log(movieURL);
getCmd(cmd)
function getCmd(cmd){
        switch (cmd){
        case bandCmd:
            console.log('this is band');
            console.log(searchValue)
            getBands();
            break;
        case spotifyCmd:
            console.log('this is an actor');
            console.log(searchValue)
          getSpotifySong(searchValue)
            break;
       case movieCmd:
        console.log('move')
        console.log(searchValue)
        getMovies(searchValue);
        break;
       case doitCmd:
       console.log('doit')
       break;
    }
}




function getSpotifySong(song){
   console.log(song);
    spotify
  .search({ type: 'track', query: `${song}` })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
}
console.log('sent bands ' + searchValue);

function getBands(){
    console.log(bandsURL)
    axios.get(bandsURL).then(function(response){
        console.log(response.data);
    })

}