const JSON_PATH = 'https://www.mockachino.com/bae58b2a-f8d0-48/movies';

class App {
  constructor() {
    this._onJsonReady = this._onJsonReady.bind(this);
    this._onAscClick = this._onAscClick.bind(this);
    this._onDescClick = this._onDescClick.bind(this);
    this._onOrderClick = this._onOrderClick.bind(this);
    this._renderMovies = this._renderMovies.bind(this);
    this._onSearchClick = this._onSearchClick.bind(this);

    document.addEventListener('DOMContentLoaded', () => {
      // Botón ascendente
      const ascButton = document.querySelector("#asc");
      if (ascButton) {
        ascButton.addEventListener("click", this._onAscClick);
      }

      // Botón descendente
      const descButton = document.querySelector("#desc");
      if (descButton) {
        descButton.addEventListener("click", this._onDescClick);
      }

      // Botón para ver en orden
      const orderButton = document.querySelector("#order");
      if (orderButton) {
        orderButton.addEventListener("click", this._onOrderClick);
      }

      // Botón para buscar
      const searchButton = document.querySelector("#search-button");
      if (searchButton) {
        searchButton.addEventListener("click", this._onSearchClick);
      }
      console.log("Event listeners added");

      // Cargar películas
      this.loadMovies();
    });
  }

  _renderMovies() {
    console.log("Rendering movies...");
    const movieContainer = document.querySelector("#movie-container");
    movieContainer.innerHTML = "";
    for (const movie of this.moviesList) {
      new Movie(movieContainer, movie.poster, movie.title, movie.year, movie.summary);
    }
  }

  // Botón ascendente
  _onAscClick() {
    console.log("Sorting by ascending year...");
    this.moviesList.sort((a1, a2) => a1.year - a2.year);
    this._renderMovies();
  }

  // Botón descendente
  _onDescClick() {
    console.log("Sorting by descending year...");
    this.moviesList.sort((a1, a2) => a2.year - a1.year);
    this._renderMovies();
  }

  // Botón para ver en orden
  _onOrderClick() {
    console.log("Sorting by episode order...");
    this.moviesList.sort((a1, a2) => a1.episode - a2.episode);
    this._renderMovies();
  }

  _onSearchClick(event) {
    event.preventDefault();
    console.log("Search button clicked");
    const searchInput = document.querySelector("#search-input").value.toLowerCase();
    console.log("Searching for:", searchInput);
    const filteredMovies = this.moviesList.filter(movie =>
      movie.searchtitle.toLowerCase() === (searchInput)
    );
    console.log("Filtered movies:", filteredMovies);
    
    // Limpia el contenedor de películas
    const movieContainer = document.querySelector("#movie-container");
    movieContainer.innerHTML = "";
    
    if (filteredMovies.length === 0) {
      const notFoundElement = document.createElement('div');
      notFoundElement.textContent = "Movie not found";
      movieContainer.appendChild(notFoundElement);
    } else {

    // Renderiza las películas filtradas en el contenedor usando la clase Movie
    for (const movie of filteredMovies) {
      new Movie(
        movieContainer,
        movie.poster,
        movie.title,
        movie.year,
        movie.summary
      );
    }
  }
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
  }

  _onResponse(response) {
    console.log("Response received:", response);
    return response.json();
  }
}

class Movie {
  constructor(movieContainer, imageUrl, title, year, summary) {
    console.log("Creating movie element:", title);
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
      <h3>${title}</h3>
      <img class="movie-poster" src="${imageUrl}" alt="${title}" />
      <p><strong>Year:</strong> ${year}</p>
      <p><strong>Summary:</strong> ${summary}</p>
    `;
    movieContainer.appendChild(movieElement);
  }
}

// script.js
const app = new App();
app.loadMovies();


