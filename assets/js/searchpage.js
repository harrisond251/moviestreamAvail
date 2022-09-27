var movieName = 'step brothers';

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

