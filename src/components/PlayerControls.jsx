import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
export default function PlayerControls() {
  // redux hook
  const [{ token, playerState, currentPlaying }, dispatch] = useStateProvider();

  // song play and control function
  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };

  // check type of song function
  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    const response1 = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response1.data !== "") {
      const currentPlaying = {
        id: response1.data.item.id,
        name: response1.data.item.name,
        artists: response1.data.item.artists.map((artist) => artist.name),
        image: response1.data.item.album.images[2].url,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
    }
  };
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 0.4;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // convert time milisecound into min or sec function
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <div>
      <Container>
        <div className="shuffle">
          <BsShuffle />
        </div>
        <div className="previous">
          <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
        </div>
        <div className="state">
          {playerState ? (
            <BsFillPauseCircleFill onClick={changeState} />
          ) : (
            <BsFillPlayCircleFill onClick={changeState} />
          )}
        </div>
        <div className="next">
          <CgPlayTrackNext onClick={() => changeTrack("next")} />
        </div>
        <div className="repeat">
          <FiRepeat />
        </div>
      </Container>
      <Box sx={{ width: '100%', marginTop: 2 }}>
        <LinearProgress variant="determinate" value={progress} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
          <p style={{ color: '#b3b3b3', fontSize: '12px' }}>
            
          </p>
          <p style={{ color: '#b3b3b3', fontSize: '12px' }}>
            {msToMinutesAndSeconds(currentPlaying?.timeSong)}
          </p>
        </Box>
      </Box>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;
