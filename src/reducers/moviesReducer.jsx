import * as Actions from "../actions/moviesActions";

const initialState = {
  movies: {},
  favoriteMovies: []
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_MOVIES:
      return {
        ...state,
        movies: {
          ...state.movies,
          [`${action.payload.category}-${action.payload.page}`]: {
            movies: action.payload.movies,
            total_pages: action.payload.total_pages
          }
        }
      };
    case Actions.SET_FAVORITE_MOVIES:
      return {
        ...state,
        favoriteMovies: action.payload
      };
    default:
      return state;
  }
};

export default moviesReducer;
