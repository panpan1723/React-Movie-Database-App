import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import moviesReducer from "./reducers/moviesReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
