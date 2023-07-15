import React, { useEffect } from "react";
import { fetchFavoriteMovies, removeFavorite } from "../api";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { setFavoriteMovies } from "../actions/moviesActions";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
  padding: 48px;
`;

export default function FavoritePage() {
  // const [favoriteMovies, setFavoriteMovies] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const isLogin = useSelector((state) => state.user.isLogin);

  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (user) {
      fetchFavoriteMovies(user.accountId).then((data) => {
        setFavoriteMovies(data.results);
      });
    } else {
      setFavoriteMovies([]);
    }
  }, [user]);

  const handleClickLike = (movieId) => {
    console.log("movieId", movieId);
    removeFavorite(movieId, user.accountId).then(() => {
      dispatch(
        setFavoriteMovies(favoriteMovies.filter((m) => m.id !== movieId))
      );
    });
  };

  return (
    <>
      <ListContainer>
        {favoriteMovies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClickLike={() => {
                handleClickLike(movie.id);
              }}
              liked={favoriteMovies.find((m) => m.id === movie.id)}
            />
          );
        })}
      </ListContainer>
    </>
  );
}
