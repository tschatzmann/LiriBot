require("dotenv").config();
let axios = require("axios")
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let moment = require("moment");
let inquirer = require("inquirer");
let fs = require("fs")

let spotify = new Spotify(keys.spotify);


let cmd = "";
let searchValue = "";
let defaultMoivie = "Mr. Nobody";
let defaultSong = "The Sign"


var bandCmd = 'concert-this';

var spotifyCmd = 'spotify-this-song';

var movieCmd = 'movie-this';

var doitCmd = 'do-what-it-says';

var omdbApi = keys.omdbApiKey.id;

function processCmd(cmd, searchValue){
        switch (cmd){
        case bandCmd:
            console.log('this is band');
            console.log(searchValue)
            getBands(searchValue);
            break;
        case spotifyCmd:
            console.log('this is an song');
            console.log(searchValue)
            if(searchValue==""){
              searchValue = defaultSong
            };
          getSpotifySong(searchValue)
            break;
       case movieCmd:
        console.log('move')
        console.log(searchValue)
        if(searchValue==""){
          searchValue = defaultMoivie
        };
        getMovies(searchValue);
        break;
       case doitCmd:
       console.log('doit')
       justDoIt();
       break;
    }
}


function getSpotifySong(song){
   console.log(song);
    spotify
  .search({ type: 'track', query: `${song}`, limit:1 })
  .then(function(response) {
    console.log(response.tracks.items);
  })
  .catch(function(err) {
    console.log(err);
  });
}
console.log('sent bands ' + searchValue);

function getBands(band){
    let bandsURL = `https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`
    console.log(bandsURL);
    console.log('before axios call');
    axios.get(bandsURL).then(function(response){
    for(var i = 0; i < response.data.length; i++){
      console.log(response.data[i]);
      console.log(response.data[i].venue.name);
      datetime = response.data[i].datetime
      console.log(datetime);
      let date = moment(datetime).format("MM/DD/YYYY");
      console.log(date)
    }
    })

};

function getMovies(movie){
  var movieURL = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=${omdbApi}`
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
};

function justDoIt(){
  fs.readFile("random.txt", "utf8", function(err, data){
    // console.log(data);
    let info = data.split(",");
    cmd = info[0];
    searchValue = info[1];
    console.log(info);
    console.log(cmd)
    console.log(searchValue)
    processCmd(cmd, searchValue);
});
}

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we give the user a list to choose from.
    {
      type: "list",
      message: "What do you want to search for today?",
      choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "cmd"
    },
        // Here we create a basic text prompt.
        {
          type: "input",
          message: "What would you like to search for?",
          name: "searchValue"
        },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm) {
      console.log('cmd in inqurire ' + inquirerResponse.cmd);
      console.log('searchValue from inqurier ' + inquirerResponse.searchValue);
      cmd = inquirerResponse.cmd;
      searchValue = inquirerResponse.searchValue;
      processCmd(cmd,searchValue);
    }
    else {
      console.log("\nThat's okay , come again when you are more sure.\n");
    }
  });


