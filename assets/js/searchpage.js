var title ='';
var year ='';


// Designating variables for HTML elements
var moviePosterEl = document.querySelector('#movie-poster');
var searchHistoryEl = document.querySelector('#history-list');


/* api url for streaming availability*/
var apiUrl = "https://streaming-availability.p.rapidapi.com/get/basic?country=us";

/* defines method for fetch methods */
const option2 = {
  method: 'GET',
};

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '9b73a9c0d1msh3e6ef4e5723685ep1028d6jsn55b713e0fed6',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  }
};

function getInputs() {
  // gets the parameters title and year from previous page, from local URL.
  var searchParamsArr = document.location.search.split('&');
  title = searchParamsArr[0].split('=').pop();
  year = searchParamsArr[1].split('=').pop();

  fetchMovieApi(title, year);
  createPastSearchBtn(title, year);
}

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
function fetchMovieApi(title, year) {
fetch( api2Url + "&t=" + title + '&y=' + year , option2)
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
  }
  
  getInputs();


// Creates additional search buttons
function createPastSearchBtn (title, year) {
    var pastSearchBtn = document.createElement('button');
    // Update 'movieName' variable once this is officially created here based on the search input
    pastSearchBtn.textContent = title;
    pastSearchBtn.setAttribute('type', 'button');
    pastSearchBtn.classList.add('btn', 'button', 'is-primary', 'mt-4', 'past-search-btn');
    searchHistoryEl.append(pastSearchBtn);
    pastSearchBtn.addEventListener('click', searchHandlerPast);
}

// Handles the search input from buttons created from previous searches
function searchHandlerPast (event) {
    movieName = event.target.textContent;
    fetchMovieApi(title, year);
}

// Adding event listener to the buttons created from previous searches. This allows the user to interact with the past search buttons that appeared upon loading the page
var allPastSearchBtns = document.querySelectorAll('.past-search-btn');

allPastSearchBtns.forEach(item => {
    item.addEventListener('click', searchHandlerPast);
})

