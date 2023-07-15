import React, { useEffect } from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { fetchFavoriteMovies, addFavorite, removeFavorite } from "../api";
import CategorySelect from "./CategorySelector";
import { CATEGORIES } from "../constants";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAndStoreMovies,
  setFavoriteMovies
} from "../actions/moviesActions";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
  padding: 48px;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const StyledCategorySelect = styled(CategorySelect)`
  position: absolute;
  left: 48px;
`;

export default function HomePage() {
  const [category, setCategory] = React.useState(CATEGORIES[0].id);
  const [page, setPage] = React.useState(1);
  // const [favoriteMovies, setFavoriteMovies] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const isLogin = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();

  const data = useSelector((state) => {
    // console.log("state:", state.movies.movies);
    return (
      state.movies.movies[`${category}-${page}`] || {
        movies: [],
        total_pages: 1
      }
    );
  });
  const movies = data.movies;
  const totalPages = data.total_pages;

  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    // console.log("userData:", userData);
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
    } else {
      setUser(null);
    }
  }, [isLogin]);

  const handleCategoryChange = (category) => {
    setCategory(category);
    setPage(1);
  };

  useEffect(() => {
    dispatch(fetchAndStoreMovies(category, page));
  }, [category, page, dispatch]);

  useEffect(() => {
    if (user) {
      fetchFavoriteMovies(user.accountId).then((data) => {
        dispatch(setFavoriteMovies(data.results));
      });
    } else {
      dispatch(setFavoriteMovies([]));
    }
  }, [user, dispatch]);

  const handleClickPrev = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const handleClickNext = () => {
    if (page !== totalPages) {
      setPage(page + 1);
    }
  };

  const handleClickLike = (movieId) => {
    if (!isLogin) {
      return;
    }
    // console.log("movieId", movieId);
    const movie = movies.find((m) => m.id === movieId);
    if (favoriteMovies.find((m) => m.id === movieId)) {
      removeFavorite(movieId, user.accountId).then(() => {
        dispatch(
          setFavoriteMovies(favoriteMovies.filter((m) => m.id !== movieId))
        );
      });
    } else {
      addFavorite(movieId, user.accountId).then(() => {
        dispatch(setFavoriteMovies([...favoriteMovies, movie]));
      });
    }
  };

  return (
    <>
      <ControlsContainer>
        <StyledCategorySelect
          category={category}
          setCategory={handleCategoryChange}
        />
        <Pagination
          onClickPrev={handleClickPrev}
          onClickNext={handleClickNext}
          currentPage={page}
          totalPages={totalPages}
        />
      </ControlsContainer>
      <ListContainer>
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClickLike={() => {
                handleClickLike(movie.id);
              }}
              liked={favoriteMovies.find(
                (favMovie) => favMovie.id === movie.id
              )}
            />
          );
        })}
      </ListContainer>
    </>
  );
}
