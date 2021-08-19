import axios from "axios";

const DEFAULT_HEADER = {
  authorization: 'Basic dXNlcjptb3ZpZXJhdGlvbg==',
  'Content-Type': 'application/json',
};

const catchError = (err) => {
  console.log(err?.response || err);
  return err;
}

export const getAllCategories = async () => {
  const URL = '/api/categories/getAll';
  try {
    const response = await axios({
      method: 'GET',
      url: URL,
      headers: DEFAULT_HEADER,
    });
    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const getAllEmotions = async () => {
  const URL = '/api/emotions/getAll';
  try {
    const response = await axios({
      method: 'GET',
      url: URL,
      headers: DEFAULT_HEADER,
    });
    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const banUserByUsername = async (username) => {
  const URL = `/api/users/banByUsername/${username}`;

  try {
    const response = await axios({
      method: 'PUT',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const unBanUserByUsername = async (username) => {
  const URL = `/api/users/unbanByUsername/${username}`;

  try {
    const response = await axios({
      method: 'PUT',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const getAllMovies = async () => {
  const URL = '/api/movies/getAll/';

  try {
    const response = await axios({
      method: 'GET',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const getMovieById = async (movieId) => {
  const URL = `/api/movies/findById/${movieId}`;

  try {
    const response = await axios({
      method: 'GET',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const getMoviesByCategoryId = async (categoryId) => {
  const URL = `/api/movies/findByCategoryId/${categoryId}`;

  try {
    const response = await axios({
      method: 'GET',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const getMoviesByEmotionId = async (emotionId) => {
  const URL = `/api/movies/findByEmotionId/${emotionId}`;

  try {
    const response = await axios({
      method: 'GET',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const deleteMovieById = async (movieId) => {
  const URL = `/api/movies/delete/${movieId}`;

  try {
    const response = await axios({
      method: 'DELETE',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const addMovie = async (movieData) => {
  const URL = '/api/movies/add';

  try {
    const response = await axios({
      method: 'POST',
      url: URL,
      data: movieData,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const logInToServer = async (loginData) => {
  const URL = '/api/auth/login';

  try {
    const response = await axios({
      method: 'POST',
      url: URL,
      data: loginData,
    });

    return response;
  } catch (err) {
    console.log(err, "a")
    return catchError(err);
  }
};

export const registerToServer = async (registerData) => {
  const URL = '/api/users/add';

  try {
    const response = await axios({
      method: 'POST',
      url: URL,
      data: registerData,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const getCommentsByMovieId = async (movieId) => {
  const URL = `/api/userReviews/findByMovieId/${movieId}`;

  try {
    const response = await axios({
      method: 'GET',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const getCommentsByUserId = async (userId) => {
  const URL = `/api/userReviews/findByUserId/${userId}`;

  try {
    const response = await axios({
      method: 'GET',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const addCommentToMovie = async (commentData) => {
  const URL = '/api/userReviews/add';

  try {
    const response = await axios({
      method: 'POST',
      url: URL,
      data: commentData,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const getWatchedMoviesByUserId = async (userId) => {
  const URL = `/api/userWatchedMovies/findByUserId/${userId}`;

  try {
    const response = await axios({
      method: 'GET',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const addWatchedMovie = async (watchedMovieData) => {
  const URL = '/api/userWatchedMovies/add';

  try {
    const response = await axios({
      method: 'POST',
      url: URL,
      data: watchedMovieData,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
}

export const deleteWatchedMovieById = async (id) => {
  const URL = `/api/userWatchedMovies/delete/${id}`;

  try {
    const response = await axios({
      method: 'DELETE',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const changeUserPasswordById = async (id, password) => {
  const URL = `/api/users/changePassword/${id}/${password}`;

  try {
    const response = await axios({
      method: 'PUT',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const deleteAccountById = async (id) => {
  const URL = `/api/users/delete/${id}`;

  try {
    const response = await axios({
      method: 'DELETE',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};

export const deleteCommentById = async (id) => {
  const URL = `/api/userReviews/delete/${id}`;

  try {
    const response = await axios({
      method: 'DELETE',
      url: URL,
      headers: DEFAULT_HEADER,
    });

    return response;
  } catch (err) {
    return catchError(err);
  }
};