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
  }

}

export default api