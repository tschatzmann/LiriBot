require("dotenv").config();
let axios = require("axios")
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let moment = require("moment");
let inquirer = require("inquirer");
let fs = require("fs")
let spotify = new Spotify(keys.spotify);
//console.log(spotify)

let cmd = "";
let searchValue = "";
let defaultMoivie = "Mr. Nobody";
let defaultSong = "The Sign"
let bandCmd = 'concert-this';
let spotifyCmd = 'spotify-this-song';
let movieCmd = 'movie-this';
let doitCmd = 'do-what-it-says';
let omdbApi = keys.omdbApiKey.id;

function processCmd(cmd, searchValue) {
  switch (cmd) {
    case bandCmd:
      //console.log('this is band');
      //console.log(searchValue)
      if (searchValue == "") {
        console.log('you did not enter a band');
        break;
      }
      getBands(searchValue);
      break;
    case spotifyCmd:
      //console.log('this is an song');
      //console.log(searchValue)
      if (searchValue == "") {
        searchValue = defaultSong
      };
      getSpotifySong(searchValue)
      break;
    case movieCmd:
      //console.log('move')
      //console.log(searchValue)
      if (searchValue == "") {
        searchValue = defaultMoivie
      };
      getMovies(searchValue);
      break;
    case doitCmd:
     // console.log('doit')
      justDoIt();
      break;
    default:
      console.log('I do not understand that command');
      break;
  }
}


function getSpotifySong(song) {
  //console.log(song);
  spotify
    .search({ type: 'track', query: `${song}`, limit: 1 })
    .then(function (response) {
      let song = response.tracks.items[0];
      //console.log(song)
      let songResponse = [
        'Artist: ' + song.album.artists[0].name,
        'Song Name: ' + song.name,
        'Song Preview: ' + song.preview_url,
        'Album: ' + song.album.name
      ]
      console.log(songResponse)
    })
    .catch(function (err) {
      console.log(err);
    });
}
//console.log('sent bands ' + searchValue);

function getBands(band) {
  let bandsURL = `https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`
 //onsole.log(bandsURL);
  //console.log('before axios call');
  axios.get(bandsURL).then(function (response) {
    let bands = response.data;
    for (let i = 0; i < bands.length; i++) {
      let bandEvents = bands[i];
      let concerts = [
        'Name of the venue: ' + bandEvents.venue.name,
        'Venue location: ' + bandEvents.venue.city + bandEvents.venue.region,
        'Date of the Event: ' + moment(bandEvents.venue.datetime).format("MM/DD/YYYY")
      ]
      console.log(concerts);
    }
  })

};

function getMovies(movie) {
  let movieURL = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=${omdbApi}`
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

function justDoIt() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    // console.log(data);
    let info = data.split(",");
    cmd = info[0];
    searchValue = info[1];
   //console.log(info);
    //console.log(cmd)
    //console.log(searchValue)
    console.log('Doing ' + cmd + ' for ' + searchValue)
    processCmd(cmd, searchValue);
  });
}

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we give the user a list to choose from.
    {
      type: "list",
      message: "How may I help you today?",
      choices: [bandCmd, spotifyCmd, movieCmd, doitCmd],
      name: "cmd"
    },
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What should I search for?",
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
  .then(function (inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm) {
      //console.log('cmd in inqurire ' + inquirerResponse.cmd);
      //console.log('searchValue from inqurier ' + inquirerResponse.searchValue);
      cmd = inquirerResponse.cmd;
      searchValue = inquirerResponse.searchValue;
      processCmd(cmd, searchValue);
    }
    else {
      console.log("\nThat's okay, let me know when you are ready to the search again.\n");
    }
  });