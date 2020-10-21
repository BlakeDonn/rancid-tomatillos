export const getIndividualMovie = async (id, props) => {
  try {
    let promise = await fetch(
      `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`
    );
    return await promise.json();
  } catch (e) {
    throw e;
  }
};

export const getAllMovies = async () => {
  try {
    const promise = await fetch(
      "https://rancid-tomatillos.herokuapp.com/api/v2/movies/"
    );
    return await promise.json();
  } catch (e) {
    throw e;
  }
};

export const getFavoriteMovies = async () => {
  try {
    const promise = await fetch(
      "https://rancid-tomatillos-backend.herokuapp.com/api/v1/favorites"
    );
    return await promise.json();
  } catch (e) {
    throw e;
  }
};

export const postFavorite = async (id) => {
  try {
    const promise = await fetch(
      "https://rancid-tomatillos-backend.herokuapp.com/api/v1/favorites",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: id}),
      }
    );
    return await promise.json();
  } catch (e) {
    throw e;
  }
};
export const postUserLogin = async (loginInfo) => {
  try {
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
  } catch (e) {
    throw e;
  }
};

export const getUserRatings = async (id) => {
  try {
    const promise = await fetch(
      `https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`
    );
    return await promise.json();
  } catch (e) {
    throw e;
  }
};

export const postUserRating = async (id, userRating, movieId) => {
  try {
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
  } catch (e) {
    throw e;
  }
};

export const deleteUserRating = async (userId, ratingId) => {
  try {
    fetch(
      `https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings/${ratingId}`,
      {
        method: "DELETE",
      }
    );
  } catch (e) {
    throw e;
  }
};

export const getMovieComments = async (movieId) => {
  try {
    let promise = await fetch(
      `https://rancid-tomatillos-backend.herokuapp.com/api/v1/movies/${movieId}/comments`
    );
    return await promise.json();
  } catch (e) {
    throw e
  }
};

export const postUserComment = async (movieId, userName, comment) => {
  try {
    fetch(`https://rancid-tomatillos-backend.herokuapp.com/api/v1/movies/${movieId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        { comment: comment, author: userName }
      )
    })
  } catch (e) {
    throw e;
  }
};

