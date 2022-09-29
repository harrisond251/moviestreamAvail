var title ='';
var year ='';
var searchHistory = [];
var titleEl = document.querySelector('#title');
var yearEl = document.querySelector('#year');



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

// Form submission for searchpage.
function handleSearchFormSubmit(event) {
  event.preventDefault();

var title = titleEl.value;
var year = yearEl.value;
  if (!title) {
      errorMessage.textContent = 'Please enter a search input value';

      setTimeout(function(){
          errorMessage.textContent = '';
      }, 2000);

      return;
  }

  fetchMovieApi(title, year);
}
// when user searches, refreshes page to new movie info
var searchBtn = document.querySelector('#search-btn');
searchBtn.addEventListener('click', handleSearchFormSubmit);

function getInputs() {
  // gets the parameters title and year from previous page, from local URL.
  var searchParamsArr = document.location.search.split('&');
  title = searchParamsArr[0].split('=').pop();
  year = searchParamsArr[1].split('=').pop();

  fetchMovieApi(title, year);
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
// HERE ADD ERROR MESSAGE FOR 404 RESPONSE
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
        storeHistory(title, year);

        // Fix this for loop to properly read the object
        for (var i = 0; i < searchHistory.length; i++) {
            if (searchHistory[i].Title.includes(movietitle)) {
                return;    
            } else {
                createPastSearchBtn(movietitle, year);
            }
    }
    }) 
}

  
  getInputs();


// Creates additional search buttons
function createPastSearchBtn (title, year) {
    var pastSearchBtn = document.createElement('button');
    // Update 'title' variable once this is officially created here based on the search input
    pastSearchBtn.textContent = title;
    pastSearchBtn.setAttribute('type', 'button');
    pastSearchBtn.classList.add('btn', 'button', 'is-primary', 'mt-4', 'past-search-btn');
    searchHistoryEl.append(pastSearchBtn);
    pastSearchBtn.addEventListener('click', searchHandlerPast);
}

// Handles the search input from buttons created from previous searches
function searchHandlerPast (event) {
    title = event.target.textContent;
    fetchMovieApi(title, year);

}

// Adding event listener to the buttons created from previous searches. This allows the user to interact with the past search buttons that appeared upon loading the page
// var allPastSearchBtns = document.querySelectorAll('.past-search-btn');

// allPastSearchBtns.forEach(item => {
//     item.addEventListener('click', searchHandlerPast);
// })

// Stores previous searches within an array if a movie was not previously searched for and stores these searches in the local storage
function storeHistory (title, year) {
    if (searchHistory.includes(title)) { // Update this if statement to properly read the object
        return;
    } else {
    searchHistory.push({Title: title, Year: year});
    localStorage.setItem('Search History', JSON.stringify(searchHistory));
}}

// Checks the local storage for past searches and initializes creating button elements for them if so. Also hides the results-area.
function init () {
    var storedSearches = JSON.parse(localStorage.getItem("Search History"))

    if (storedSearches !== null) {
        searchHistory = storedSearches;
    }
    createPastSearchBtnOnPageLoad();
}


// Creates a button element for each past search stored in the local storage
function createPastSearchBtnOnPageLoad () {
    for (var i = 0; i < searchHistory.length; i++) {
        var pastSearchBtn = document.createElement('button');
        pastSearchBtn.textContent = searchHistory[i].Title;
        pastSearchBtn.setAttribute('type', 'button');
        pastSearchBtn.classList.add('btn', 'button', 'is-primary', 'mt-4', 'past-search-btn');
        searchHistoryEl.append(pastSearchBtn);
        pastSearchBtn.addEventListener('click', searchHandlerPast);
    }
}

init();

