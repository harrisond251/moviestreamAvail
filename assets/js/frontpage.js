var errorMessage = document.querySelector('#error-message');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#title').value;
    var yearInputVal = document.querySelector('#year').value;

    if (!searchInputVal) {
        errorMessage.textContent = 'Please enter a search input value';

        setTimeout(function(){
            errorMessage.textContent = '';
        }, 2000);

        return;
    }

    var queryString = './searchpage.html?q=' + searchInputVal + '&y=' + yearInputVal;

    location.assign(queryString);
}

var searchBtn = document.querySelector('#search-btn');
searchBtn.addEventListener('click', handleSearchFormSubmit);