 //Clase 2
 class Movie {
    constructor(movieContainer, imageUrl, title, year, summary) {
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
  export default Movie;