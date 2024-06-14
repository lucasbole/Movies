import Movie from './movie.js';
import Search from './search.js';

const JSON_PATH = '/api/movies';
//Clase 1
class App {
  constructor() {
    this._onJsonReady = this._onJsonReady.bind(this);
    this._onAscClick = this._onAscClick.bind(this);
    this._onDescClick = this._onDescClick.bind(this);
    this._onOrderClick = this._onOrderClick.bind(this);
    this._renderMovies = this._renderMovies.bind(this);

    document.addEventListener('DOMContentLoaded', () => {
      const ascButton = document.querySelector("#asc");
      if (ascButton) {
        ascButton.addEventListener("click", this._onAscClick);
      }

      const descButton = document.querySelector("#desc");
      if (descButton) {
        descButton.addEventListener("click", this._onDescClick);
      }

      const orderButton = document.querySelector("#order");
      if (orderButton) {
        orderButton.addEventListener("click", this._onOrderClick);
      }

      console.log("Event listeners added");
      this.loadMovies();
    });
  }

  _renderMovies(movies = this.moviesList) {
    console.log("Rendering movies...");
    const movieContainer = document.querySelector("#movie-container");
    movieContainer.innerHTML = "";
    for (const movie of movies) {
      new Movie(movieContainer, movie.poster, movie.title, movie.year, movie.summary);
    }
  }

  _onAscClick() {
    console.log("Sorting by ascending year...");
    this.moviesList.sort((a1, a2) => a1.year - a2.year);
    this._renderMovies();
  }

  _onDescClick() {
    console.log("Sorting by descending year...");
    this.moviesList.sort((a1, a2) => a2.year - a1.year);
    this._renderMovies();
  }

  _onOrderClick() {
    console.log("Sorting by episode order...");
    this.moviesList.sort((a1, a2) => a1.episode - a2.episode);
    this._renderMovies();
  }

  loadMovies() {
    console.log("Loading movies from:", JSON_PATH);
    fetch(JSON_PATH)
      .then(this._onResponse)
      .then(this._onJsonReady)
      .catch(error => console.error('Error loading movies:', error));
  }

  _onJsonReady(json) {
    console.log("JSON ready:", json);
    this.moviesList = json.movies;
    this._renderMovies();

    const search = new Search(this.moviesList);
  }

  _onResponse(response) {
    console.log("Response received:", response);
    return response.json();
  }
}

const app = new App();
app.loadMovies();


