import axios from "axios";
import React, { useEffect } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import "../styles/playList.css";

export default function Playlist() {
  // redux hook
  const [{ token, playlists }, dispatch] = useStateProvider();
  // get current user playlist 
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "my data");
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      // console.log(playlists, "song data");
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);
  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };
  return (
    <div className="mainDiv">
      <ul>
        {playlists.map(({ name, id }) => {
          return (
            <li key={id} onClick={() => changeCurrentPlaylist(id)} className="myLink">
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
