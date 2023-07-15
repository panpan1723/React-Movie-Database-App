import axios from "axios";
const API_KEY = "ab5e85b4efa0bff314d0abbcf12e4120";
const BEARER_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjVlODViNGVmYTBiZmYzMTRkMGFiYmNmMTJlNDEyMCIsInN1YiI6IjY0NzE4ODI4OTQwOGVjMDExZjJiM2ZlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4zth2nW36LlXaS7OMcUjnTEdZbeozHqY5W1fcEDKFiI";

export const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 1000,
  params: {
    api_key: `${API_KEY}`
  }
});

export const fetchMoviesByCategory = (category, page) => {
  return client
    .get(`/movie/${category}`, { params: { page: page } })
    .then((response) => response.data);
};

export const fetchMovieDetail = (movieId) => {
  return client.get(`/movie/${movieId}`).then((response) => response.data);
};

export const addFavorite = (movieId, accountId) => {
  const data = {
    media_type: "movie",
    media_id: movieId,
    favorite: true
  };

  return client
    .post(`/account/${accountId}/favorite`, data, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: BEARER_TOKEN
      }
    })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

export const removeFavorite = (movieId, accountId) => {
  const data = {
    media_type: "movie",
    media_id: movieId,
    favorite: false
  };

  return client
    .post(`/account/${accountId}/favorite`, data, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: BEARER_TOKEN
      }
    })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

export const fetchFavoriteMovies = (accountId) => {
  return client
    .get(`/account/${accountId}/favorite/movies`, {
      params: {
        language: "en-US",
        sort_by: "created_at.asc"
      },
      headers: {
        accept: "application/json",
        Authorization: BEARER_TOKEN
      }
    })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

export const rateMovie = (movieId, value) => {
  const data = {
    value: value
  };

  return client
    .post(`/movie/${movieId}/rating`, data, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: BEARER_TOKEN
      }
    })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

export const fetchRatedMovies = (
  accountId,
  language = "en-US",
  sort_by = "created_at.asc"
) => {
  return client
    .get(`/account/${accountId}/rated/movies`, {
      params: {
        language: language,
        sort_by: sort_by
      },
      headers: {
        accept: "application/json",
        Authorization: BEARER_TOKEN
      }
    })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};
