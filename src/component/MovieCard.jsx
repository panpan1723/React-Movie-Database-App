import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const MovieCardContainer = styled.div`
  text-align: center;
  /* box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1); */
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  /* border: 3px solid black; */
  position: relative;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
  .movie-card-img img {
    width: 100%;
    /* border: 3px solid red; */
  }

  .movie-card-info {
    /* border: 3px solid purple; */
    padding: 0px 10px 10px 10px;
    /* height: 100%; */
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
  }

  .movie-card-title {
    font-size: 1.5rem;
    margin: 1rem 0;
    cursor: pointer;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: #3f51b5;
      }
    }
  }

  .movie-card-rating {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
  }

  .movie-card-rating .icon {
    font-size: 1.5rem;
  }

  .movie-card-rating .rating {
    display: flex;
    align-items: center;
  }

  .movie-card-rating .icon.ion-md-heart-empty {
    cursor: pointer;
  }
  .movie-card-rating .icon.ion-md-heart {
    cursor: pointer;
    color: red;
  }

  .movie-card-rating .icon.rating-icon {
    color: #f5c518;
    margin-right: 0.5rem;
    cursor: default;
  }
`;

export default function MovieCard(props) {
  return (
    <MovieCardContainer>
      <div className="movie-card-img">
        <img
          src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
          alt="movie poster"
        />
      </div>
      <div className="movie-card-info">
        <h4 className="movie-card-title">
          <Link to={`/movies/${props.movie.id}`}>{props.movie.title}</Link>
        </h4>
        <div className="movie-card-rating">
          <div className="rating">
            <StarIcon className="icon rating-icon" />
            {/* <i className="icon ion-md-star rating-icon"></i> */}
            <span>
              {props.movie.vote_average}
              {props.showRating && `/${props.movie.rating}`}
            </span>
          </div>
          <div onClick={() => props.onClickLike(props.movie.id)}>
            {props.liked ? (
              <FavoriteIcon
                className="like-icon icon"
                style={{ color: "red" }}
              />
            ) : (
              <FavoriteBorderIcon className="like-icon icon" />
            )}
          </div>
        </div>
      </div>
    </MovieCardContainer>
  );
}
