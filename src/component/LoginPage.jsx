import React from "react";
import { client } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginAction } from "../actions/userActions";
import styled from "styled-components";
import {
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  padding-top: 80px;
  height: 100vh;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const SubmitButton = styled(Button)`
  && {
    background-color: #004c99;
    color: white;
  }
`;

export default function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (username, password) => {
    try {
      setLoading(true);
      setError("");
      const {
        data: { request_token }
      } = await client.get(`/authentication/token/new`);
      await client.post(`/authentication/token/validate_with_login`, {
        username,
        password,
        request_token
      });
      const {
        data: { session_id }
      } = await client.post(`/authentication/session/new`, { request_token });
      client.defaults.params = { ...client.defaults.params, session_id };
      const { data } = await client.get("/account");
      const userData = {
        username,
        accountId: data.id,
        sessionId: session_id,
        requestToken: request_token
      };
      // console.log("userData: ", userData);
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(userLoginAction());
      setLoading(false);
      navigate("/");
    } catch (e) {
      setError("Failed to login");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    login(username, password);
  }

  return (
    <LoginPageContainer>
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <FormContainer onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </SubmitButton>
      </FormContainer>
    </LoginPageContainer>
  );
}
