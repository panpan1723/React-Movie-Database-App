import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchMovieDetail, fetchRatedMovies, rateMovie } from "../api";
import StarIcon from "@material-ui/icons/Star";
import { useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const MovieDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 30px 100px;
`;

const ImgContainer = styled.div`
  width: 33.33%;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailsContainer = styled.div`
  flex-grow: 1;
  margin-left: 4rem;
`;

const SectionTitle = styled.h3`
  margin: 0.5rem 0;
`;

const Overview = styled.div`
  max-height: 100px;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const GenreItem = styled.div`
  padding: 0.5rem 1rem;
  background-color: #90cea1;
  margin-left: 1rem;
  color: white;
  border-radius: 5px;
  &:first-child {
    margin-left: 0;
  }
`;

const ProductionItem = styled.div`
  width: 30px;
  margin-right: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledStarIcon = styled(StarIcon)`
  color: rgb(245, 197, 24);
  padding-right: 10px;
`;

export default function MovieDetailsPage() {
  const params = useParams();
  // console.log(params.movieId);
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState(1);
  const [userRating, setUserRating] = useState("Not yet");
  // const [ratedMovies, setRatedMovies] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const isLogin = useSelector((state) => state.user.isLogin);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  useEffect(() => {
    fetchMovieDetail(params.movieId).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, [params.movieId]);

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
      fetchRatedMovies(user.accountId).then((data) => {
        const movieRating = data.results.find((m) => m.id === movie.id);
        if (movieRating) {
          const { rating } = movieRating;
          setUserRating(rating);
        } else {
          setUserRating("Not yet");
        }
      });
    }
  }, [user, movie]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleRateButtonClick = () => {
    // rateMovie(movie.id, selectedRating);
    if (isLogin) {
      rateMovie(movie.id, selectedRating).then(() => {
        setDialogContent("Rating successful！");
        setOpen(true);
      });
    } else {
      setDialogContent("You should login to rate.");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ratingOptions = [];
  for (let i = 1; i <= 10; i++) {
    ratingOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <MovieDetailsContainer>
      <ImgContainer>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="movie poster"
        />
      </ImgContainer>
      <DetailsContainer>
        <h2>{movie.title}</h2>
        <SectionTitle>Release date:</SectionTitle>
        <p>{movie.release_date}</p>
        <SectionTitle>Overview</SectionTitle>
        <Overview>{movie.overview}</Overview>
        <SectionTitle>Genres</SectionTitle>
        <Container>
          {movie.genres.map((genre) => {
            return <GenreItem key={genre.name}>{genre.name}</GenreItem>;
          })}
        </Container>
        <SectionTitle>Average Rating</SectionTitle>
        <Container>
          <StyledStarIcon />
          <p>{movie.vote_average}</p>
        </Container>
        <SectionTitle>Your Rating</SectionTitle>
        <p>{user ? userRating : `Not yet`}</p>
        <select value={selectedRating} onChange={handleRatingChange}>
          {ratingOptions}
        </select>
        <button onClick={handleRateButtonClick}>RATE IT!</button>
        <SectionTitle>Production companies</SectionTitle>
        <Container>
          <ProductionItem>
            <img
              src="https://image.tmdb.org/t/p/w500/psjvYkjjgAPtS8utnFYDM8t8yi7.png"
              alt="production company logo"
            />
          </ProductionItem>
          {movie.production_companies.map((company) => {
            return (
              <ProductionItem key={company.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                  alt="production company logo"
                />
              </ProductionItem>
            );
          })}
        </Container>
      </DetailsContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogContent}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </MovieDetailsContainer>
  );
}
