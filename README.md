# moviestreamAvail
Search application for movies to find where it could be streamed (if applicable)




# Movie Streaming Availability Search Tool

## Description

The motivation for this project was to design an application that allows the user to searh for a particular movie and be provided with information about that movie, such as an image of the movie's poster, a brief explanation of the plot, the directors, actors, and which streaming services the movie is available on. Upon loading the application, the user will be prompted to enter the title of the movie they are interested in, as well as have the option to differentiate movie searches by a desired year. Once a movie has been searched for, the user will be redirected to a separate page. If the movie the user searched for is present in the API request, then the user will be presented with the previously mentioned information about that movie. If the movie does not exist in the requested API, then the user will be requested to "please try again" with a valid search.

## Credits

The APIs and their specific features used for this project are listed below:

#### OMDb API
Used to fetch general information for movies based on their title and year
[Direct link to API source](http://www.omdbapi.com/)

#### Streaming Availability API
Used to fetch the movie poster for each movie, as well as the available streaming services.
[Direct link to API source](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability)

## Future Improvements
-Add hyperlinks to the listed available streaming services for each movie search
-Polish up the general appearance of the application
-Add a "clear history" button to clear past searches and remove their respective search buttons

## Link to Deployed App

[Direct link to webpage]()

## Preview

![A preview of the app]()

![Gif of website at work](./assets/animations/movie-stream-demo.gif)
