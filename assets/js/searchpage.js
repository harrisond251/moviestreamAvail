var movieName = 'jumanji';

// Defining variables related to the movie poster API
var moviePosterEl = document.querySelector('#movie-poster');

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
    .then(function (data) {
      console.log(data);
      var moviePosterImg = data.posterPath;

      moviePosterEl.setAttribute('src', 'https://image.tmdb.org/t/p/w780' + moviePosterImg);

    })
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
      console.log(data);

            /* creating varibles for results and sending them to html */
      var imdb_id = data.imdbID;
      var movietitle = data.Title;
      var plot = data.Plot;
      var director = data.Director;
      var actors = data.Actors;

      document.getElementById('movieTitle').innerHTML = movietitle
      document.getElementById('plotText').innerHTML = plot
      document.getElementById('directorText').innerHTML = director
      document.getElementById('actorsText').innerHTML = actors

    console.log(imdb_id)
    fetchMovieData(imdb_id)
    }) 
  
      
  