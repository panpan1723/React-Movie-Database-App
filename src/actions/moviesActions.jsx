import { fetchMoviesByCategory } from "../api";

export const ADD_MOVIES = "ADD_MOVIES";
export const SET_FAVORITE_MOVIES = "SET_FAVORITE_MOVIES";

export const addMoviesAction = (movies, total_pages, category, page) => {
  return {
    type: ADD_MOVIES,
    payload: {
      movies,
      total_pages,
      category,
      page
    }
  };
};

export const fetchAndStoreMovies = (category, page) => {
  return (dispatch, getState) => {
    const cachedData = getState().movies[`${category}-${page}`];
    if (cachedData) {
      dispatch(
        addMoviesAction(
          cachedData.movies,
          cachedData.total_pages,
          category,
          page
        )
      );
    } else {
      fetchMoviesByCategory(category, page).then((data) => {
        dispatch(
          addMoviesAction(data.results, data.total_pages, category, page)
        );
      });
    }
  };
};

export const setFavoriteMovies = (movies) => {
  return {
    type: SET_FAVORITE_MOVIES,
    payload: movies
  };
};
