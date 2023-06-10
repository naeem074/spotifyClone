import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";

export default function Volume() {
  // redux hook
  const [{ token }] = useStateProvider();

  // get current volume function
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <Container>
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} style={{margin: '10px 0px 0px 0px'}} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    // width: 5rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;
