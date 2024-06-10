import Movie from "./movie.js";
//Clase 4
class Search {
  constructor(moviesList) {
    this.moviesList = moviesList;
    this._onSearchClick = this._onSearchClick.bind(this);
    this.searchButton = document.querySelector("#search-button");
    if (this.searchButton) {
      this.searchButton.addEventListener("click", this._onSearchClick);
    }
  }

  _onSearchClick(event) {
    event.preventDefault();
    const searchInput = document.querySelector("#search-input").value.toLowerCase();
    const filteredMovies = this.moviesList.filter(movie => movie.title.toLowerCase().includes(searchInput));
    this._renderMovies(filteredMovies);
  }

  _renderMovies(movies) {
    const movieContainer = document.querySelector("#movie-container");
    movieContainer.innerHTML = "";
    if (movies.length === 0) {
      const notFoundElement = document.createElement('div');
      notFoundElement.textContent = "No movies found";
      movieContainer.appendChild(notFoundElement);
    } else {
      movies.forEach(movie => {
        new Movie(movieContainer, movie.poster, movie.title, movie.year, movie.summary);
      });
    }
  }
}

export default Search;

