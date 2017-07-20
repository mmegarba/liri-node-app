var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
// var movie = require('')
var Keys = require('./keys.js')

var request = require("request");




var client = new Twitter({
  consumer_key: Keys.twitterKeys.consumer_key,
  consumer_secret: Keys.twitterKeys.consumer_secret,
  access_token_key: Keys.twitterKeys.access_token_key,
  access_token_secret: Keys.twitterKeys.access_token_secret,
});





var spotify = new Spotify({
  id: Keys.spotifyKeys.id,
  secret: Keys.spotifyKeys.secret,
});





var userChoice;


var input = process.argv;
userChoice = input[2];







if(userChoice === "movie-this")
  {
    var userMovie = ""

  for (var i = 3; i < input.length; i++) {
    userMovie += input[i] + " "
  }

    if(userMovie === "")
{



  request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Langauge: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);



}

  });
}

else
{




request("http://www.omdbapi.com/?t=" + userMovie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Year: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Langauge: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);

}

});
}

}


if(userChoice === "my-tweets")

{


  client.get('search/tweets', {q: 'megasis23'}, function(error, tweets, response) {


    for (var i = 0; i < tweets.statuses.length; i++) {
      console.log(tweets.statuses[i].text)
    }
  });
}




if(userChoice === "spotify-this-song")

{
  var userSong = "";

  for (var i = 3; i < input.length; i++) {
    userSong += input[i] +  " "
  }

  // console.log(userSong)
if(userSong === "")
{

  spotify.search({ type: 'track', query: 'fade to black', limit:1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  console.log("Album: " + data.tracks.items[0].album.name);
  console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
  console.log("Preview_URL: "  + data.tracks.items[0].preview_url);
  console.log("Track Name: " + data.tracks.items[0].name);
  });

}

else{
  spotify.search({ type: 'track', query: userSong, limit:1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  console.log("Album: " + data.tracks.items[0].album.name);
  console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
  console.log("Preview_URL: "  + data.tracks.items[0].preview_url);
  console.log("Track Name: " + data.tracks.items[0].name);
  });



}

}
