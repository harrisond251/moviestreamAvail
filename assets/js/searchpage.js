var title = '';
var year = '';
var searchHistory = [];
// Designating variables for HTML elements
var titleEl = document.querySelector('#title');
var yearEl = document.querySelector('#year');
var resultsTitleEl = document.getElementById('results-title');
var plotTextEl = document.getElementById('plotText');
var directorTextEl = document.getElementById('directorText');
var actorsText = document.getElementById('actorsText');
var moviePosterEl = document.querySelector('#movie-poster');
var searchHistoryEl = document.querySelector('#history-list');
var movieResultsCard = document.querySelector('#movie-results');


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

var errorMessage = document.querySelector('#error-message');

// Form submission for searchpage.
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var title = titleEl.value;
  var year = yearEl.value;
  if (!title) {
    errorMessage.textContent = 'Please enter a search input value';

    setTimeout(function () {
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
  year = '';
}

/* function that stores the data that displays results for streaming availability */
function fetchMovieData(serviceId) {
  fetch(apiUrl + "&imdb_id=" + serviceId + '&output_language=en', options)
    .then(response => response.json())
    .then(function (data) {
      console.log(data);
      var moviePosterImg = data.posterPath;

      moviePosterEl.setAttribute('src', 'https://image.tmdb.org/t/p/w780' + moviePosterImg);
      var streamingObj = data.streamingInfo
      var objectKey = (Object.keys(streamingObj));
      document.getElementById('streamingServices').innerHTML = objectKey
      console.log(objectKey.length)
      if (objectKey.length === 0) {

        document.getElementById('streamingServices').innerHTML = "No Results Found"
      }

    })

    .catch(err => console.error(err));
};

/* api that stores url for omdb api */
var api2Url = "https://www.omdbapi.com/?apikey=c2500aea";

let controller = new AbortController();

/* fetch for omdb api */
function fetchMovieApi(title, year,) {
  fetch(api2Url + "&t=" + title + '&y=' + year, option2)
    .then(function (response) {
      /* converts response to json */
      return response.json();
    })
    .then(function recieveData(data) {
      console.log(data);

      // Checks to make sure that the movie searched for exists. If not, An error message is shown and the function is returned
      if (data.Error === 'Movie not found!') {
        resultsTitleEl.textContent = 'No Results Found. Please Try Again'
        movieResultsCard.style.display = 'none';
        return;
      }

      /* creating varibles for results and sending them to html */
      var imdb_id = data.imdbID;
      var movietitle = data.Title;
      var plot = data.Plot;
      var director = data.Director;
      var actors = data.Actors;

      resultsTitleEl.innerHTML = 'Results for ' + movietitle;
      plotTextEl.innerHTML = plot;
      directorTextEl.innerHTML = director;
      actorsText.innerHTML = actors;

      movieResultsCard.style.display = 'flex';
      console.log(imdb_id)
      fetchMovieData(imdb_id)
      // storeHistory(movietitle, year);

      // Push the searchHistory objects into an array and flatten the array in order to use the .include for repeat movies
      var checkArr = [];
      for (var i = 0; i < searchHistory.length; i++) {
        checkArr.push(Object.values(searchHistory[i]));
        console.log(checkArr)
      }
      checkArrCheck = checkArr.flat(1)
      console.log(checkArrCheck);

      if (checkArrCheck.includes(movietitle)) {
        return;
      } else {
        storeHistory(movietitle, year);
        createPastSearchBtn(movietitle, year);
      }
    })
}

getInputs();

// Creates additional search buttons
function createPastSearchBtn(title, year) {
  var pastSearchBtn = document.createElement('button');
  // Update 'title' variable once this is officially created here based on the search input
  pastSearchBtn.textContent = title;
  pastSearchBtn.setAttribute('type', 'button');
  pastSearchBtn.classList.add('btn', 'button', 'is-primary', 'mt-4', 'past-search-btn');
  searchHistoryEl.append(pastSearchBtn);
  pastSearchBtn.addEventListener('click', searchHandlerPast);
}

// Handles the search input from buttons created from previous searches
function searchHandlerPast(event) {
  title = event.target.textContent;
  fetchMovieApi(title, year);
}

// Stores previous searches within an array if a movie was not previously searched for and stores these searches in the local storage
function storeHistory(title, year) {
  searchHistory.push({ Title: title, Year: year });
  localStorage.setItem('Search History', JSON.stringify(searchHistory));
}

// Checks the local storage for past searches and initializes creating button elements for them if so. Also hides the results-area.
function init() {
  var storedSearches = JSON.parse(localStorage.getItem("Search History"))

  if (storedSearches !== null) {
    searchHistory = storedSearches;
  }
  createPastSearchBtnOnPageLoad();
}


// Creates a button element for each past search stored in the local storage
function createPastSearchBtnOnPageLoad() {
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

