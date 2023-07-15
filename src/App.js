import "./styles.css";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./component/Header";
import LoginPage from "./component/LoginPage";
import HomePage from "./component/HomePage";
import FavoritePage from "./component/FavoritePage";
import RatedPage from "./component/RatedPage";
import MovieDetailsPage from "./component/MovieDetailsPage";

const AppContainer = styled.div`
  /* max-width: 1678px; */
  /* margin: 0;
  color: #555;
  padding: 16px; */
  /* background-color: yellow; */
`;

export default function App() {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/rated" element={<RatedPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
      </Routes>
    </AppContainer>
  );
}
