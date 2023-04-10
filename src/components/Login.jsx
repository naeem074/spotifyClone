import React from "react";
import styled from "styled-components";
import logo from "../BeatAudio.png";

export default function Login() {
  const handleClick = async () => {
    const client_id = "a2e0fc4bdaee4bdbbc7091a2d13f7107";
    const redirect_uri = "http://localhost:3000/";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <Container>
      <img src={logo} alt="Beat Audio" />
      <button onClick={handleClick}>Login</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #205e61;
  gap: 5rem;
  img {
    height: 20vh;
    padding-bottom: -10px;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #ffffff;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
