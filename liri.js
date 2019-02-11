require("dotenv").config();
let axios = require("axios")
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let moment = require("moment");

let spotify = new Spotify(keys.spotify);


cmd = process.argv[2];
let str = cmd;
let cmd = str.toLowerCase();
searchValue = process.argv.slice(3).join(' ');
let str = searchValue;
let searchValue = str.toLowerCase();


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
    for(var i = 0; i < response.data.lenght; i++){

      console.log(response.data[i]);
      console.log(response.data[i].venue.name);
      datetime = response.data[i].datetime
      console.log(datetime);
      let date = moment(datetime).format("MM/DD/YYYY");
      console.log(date)
    }
    })

};

function getMovies(){
  axios.get(movieURL).then(
    function (response) {
        let movie = response.data;
        // console.log(movie);
        let movieResponse = [
            'Title:' + movie.Title,
            'Year: ' + movie.Year,
            'IMDB Rating: ' + movie.imdbRating,
            'Rotten Tomatoes: ' + movie.Ratings[1].Value,
            'Country: ' + movie.Country,
            'Language: ' + movie.Language,
            'Plot: ' + movie.Plot,
            'Actors: ' + movie.Actors,
        ];
        console.log(movieResponse);
    }
);
}

