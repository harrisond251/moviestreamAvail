var movieName = 'step brothers';

// Defining variables related to the movie poster API
var moviePosterEl = document.querySelector('#imgpic');
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

  var apiUrl = "https://streaming-availability.p.rapidapi.com/get/basic?country=us"
  var hell = ''
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
  
  function fetchMovieData(serviceId) { 
    fetch( apiUrl + "&imdb_id=" + serviceId + '&output_language=en', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };
  
  var api2Url = "http://www.omdbapi.com/?apikey=c2500aea"
  
  fetch( api2Url + "&t=jumanji" , option2)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var imdb_id = data.imdbID;
      console.log(imdb_id)
      fetchMovieData(imdb_id)
      }) 
  
      
  