import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function CurrentTrack() {
  // redux hook
  const [{ token, currentPlaying }, dispatch] = useStateProvider();

  // current song playing function
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response, 'currentPlayingtrack');
      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[1].url,
          timeSong: response.data.item.duration_ms,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);

  return (
    <div>
      {/* current song playing UI */}
      {currentPlaying && (
        <div className="track" style={{ display: 'flex', alignItems: 'center', gap: '1rem', }}>
          <div className="track__image">
            <img src={currentPlaying.image} alt="currentPlaying" style={{ height: '80px', width: '80px' }} />
          </div>
          <div className="track__info" style={{ display: 'flex', flexDirection: 'column', gap: '0.3' }}>
            <h5 className="track__info__track__name" style={{ color: '#fff' }}>{currentPlaying.name}</h5>
            <h6 className="track__info__track__artists" style={{ color: '#b3b3b3' }}>
              {currentPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}



