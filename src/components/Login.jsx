import React from "react";
import styled from "styled-components";
import logo from "../assests/logo.png";

export default function Login() {
  // login to spotify function
  const handleClick = async () => { 
    const client_id = "739a17f667dc40ba902cb552a51da4f6";
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
      <h1>Beat Audio.</h1>
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
  background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  background-color: rgb(32, 87, 100);
  gap: 5rem;
  img {
    height: 20vh;
    padding-bottom: -10px;
  }
  h1 {
    font-size: 22px;
    color: #fff;
    font-family: 'Poppins', sans-serif;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: #cad2c5;
    color: #000000;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
