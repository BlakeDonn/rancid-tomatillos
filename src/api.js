export const getIndividualMovie = async (id, props) => {
  try {
    let promise = await fetch(
      `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`
    )
    
    let movie = await promise.json();
  
    props.history.push({
      pathname: "/movie",
      state: {
        movie: movie.movie,
      }
    });
  } catch(err) {
    props.history.push({
      pathname: "/error",
      state: {
        error: err
      }
    })
  }

}

export const getAllMovies = async () => {
  return fetch(
    "https://rancid-tomatillos.herokuapp.com/api/v2/movies/"
  );
}

export const postUserLogin = async (loginInfo) => {
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
