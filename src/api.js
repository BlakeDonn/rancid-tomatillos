export const getIndividualMovie = async (id, props) => {
  try {
    let promise = await fetch(
      `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`
    );
    return await promise.json();
  } catch (err) {
    props.history.push({
      pathname: "/error",
      state: {
        error: err,
      },
    });
  }
};

export const getAllMovies = async () => {
  const promise = await fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies/");
  return await promise.json()
};

export const postUserLogin = async (loginInfo) => {
  const promise = await fetch(
    "https://rancid-tomatillos.herokuapp.com/api/v2/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    }
  );
  return await promise.json();
};

export const getUserRatings = async (id) => {
  const promise = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`)
  return await promise.json()
  //add error later
};

//removehardcoded bits
export const postUserRating = async (id, userRating, movieId) => {
  const promise = await fetch(
    `https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({movie_id: movieId, rating: userRating}),
    }
  );
  return await promise.json();
}

export const deleteUserRating = async (userId, ratingId) => {
  console.log(userId, ratingId)
  const promise = await fetch(
    `https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings/${ratingId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: {}
    }
  )
  return await promise.json()
}
