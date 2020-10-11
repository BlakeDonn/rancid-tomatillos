const api = {
  async getIndividualMovie(id, props) {
    let promise = await fetch(
      `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`
    );
    let movie = await promise.json();
    props.history.push({
      pathname: "/movie",
      state: {
        movie: movie.movie,
      },
    });
  },

  async getAllMovies() {
    return fetch(
      "https://rancid-tomatillos.herokuapp.com/api/v2/movies/"
    );
  },

  async postUserLogin(loginInfo) {
    return fetch(
      "https://rancid-tomatillos.herokuapp.com/api/v2/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      }
    );
  }

}

export default api