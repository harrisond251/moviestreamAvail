var movieName = document.querySelector('#title').value;

// Defining variables related to the movie poster API
var moviePosterEl = document.querySelector('#movie-poster');
var moviePosterAPIKey = '15d2ea6d0dc1d476efbca3eba2b9bbfb&query';
var moviePosterAPIURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + moviePosterAPIKey + '&query=' + movieName;
var rootPosterURL = 'http://image.tmdb.org/t/p/w500/';

// Fetching the movie poster API
fetch(moviePosterAPIURL) 
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var moviePosterURL = data.results[0].poster_path;
    moviePosterEl.setAttribute('src', rootPosterURL + moviePosterURL);
  })

/* api url for streaming availability*/
var apiUrl = "https://streaming-availability.p.rapidapi.com/get/basic?country=us";

/* defines method for fetch methods */
const option2 = {
  method: 'GET',
};

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'b564bfa71cmshde756ebe5dfec26p17269bjsnb2462c928d37',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  }
};

/* function that stores the data that displays results for streaming availability */
function fetchMovieData(serviceId) { 
  fetch( apiUrl + "&imdb_id=" + serviceId + '&output_language=en', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
};

/* api that stores url for omdb api */
var api2Url = "http://www.omdbapi.com/?apikey=c2500aea";

/* fetch for omdb api */
fetch( api2Url + "&t=jumanji" , option2)
  .then(function (response) {
    /* converts response to json */
      return response.json();
    })
    .then(function (data) {
      /* creating varibles for results and sending them to html */
      console.log(data);
      var imdb_id = data.imdbID;
      var movietitle = data.Title;
      var plot = data.Plot
      var director = data.Director
      var actors = data.Actors

      document.getElementById('movieTitle').innerHTML = movietitle
      document.getElementById('plotText').innerHTML = plot
      document.getElementById('directorText').innerHTML = director
      document.getElementById('actorsText').innerHTML = actors

    console.log(imdb_id)
    fetchMovieData(imdb_id)
    }) 
  
      
  