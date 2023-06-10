import axios from "axios";
import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from "../utils/Constants";
import image from "../assests/images.jpg";
import "../styles/home.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DownloadSongs from "./DownloadSongs";


export default function Home() {
  // redux hook
  const [{ token, selectedPlaylist, selectedPlaylistId, userInfo, currentPlaying }, dispatch] =
    useStateProvider();
  
    // get songs function
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response, "songs data");
      const selectedPlaylist = {
        id: response?.data?.id,
        name: response?.data?.name,
        description: response?.data?.description?.startsWith("<a")
          ? ""
          : response?.data?.description,
        // image: response.data.images[0].url,
        tracks: response?.data?.tracks?.items?.slice().reverse()?.map(({ track }) => ({
          id: track?.id,
          name: track?.name,
          artists: track?.artists?.map((artist) => artist.name),
          image: track?.album?.images[1]?.url,
          duration: track?.duration_ms,
          album: track?.album?.name,
          context_uri: track?.album?.uri,
          track_number: track?.track_number,
        })),
      };
      // console.log(response?.data?.tracks?.items?.slice().reverse(), "selectedPlaylist");
      // console.log(selectedPlaylist, "download id");
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);


  // current song function
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
      // console.log(response, 'currentPlaying');
      if (response.data !== "") {
        const currentPlaying = {
          id: response?.data?.item?.id,
          name: response?.data?.item?.name,
          artists: response?.data?.item?.artists?.map((artist) => artist?.name),
          image: response?.data?.item?.album?.images[1]?.url,
        };
        dispatch({ type: reducerCases?.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: reducerCases?.SET_PLAYING, currentPlaying: null });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);


  // play song function
  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      console.log(currentPlaying, "currentPlaying mmm");
      dispatch({ type: reducerCases?.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases?.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases?.SET_PLAYER_STATE, playerState: true });
    }
  };
  // convert time milisecound into min or sec function
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <div className="mainContainer">
      {
        selectedPlaylist && (
          <>
            <div className="container">
              <div className="row mainContainer mx-3 mb-4">
                <div className="col-xxl-5 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="image">
                    {
                      currentPlaying ?
                        <img src={currentPlaying?.image} alt="selected playlist" />
                        :
                        <img src={image} alt="selected playlist" />
                    }
                  </div>
                </div>
                <div className="col-xxl-7 col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-lg-3 mt-md-3 mt-sm-5">
                  <div className="details">
                    <span className="type" style={{ fontFamily: "'Poppins', sans-serif" }}>GOOD MORNING</span>
                    <h1 className="title">Songs For {" "} {userInfo?.name}</h1>
                    <p className="description">{selectedPlaylist?.description}</p>
                  </div>
                </div>
              </div>
              <TableContainer>
                <Table sx={{ minWidth: 650, marginBottom: 20 }} aria-label="simple table" >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: '#dddcdc' }}>#</TableCell>
                      <TableCell style={{ color: '#dddcdc' }}>TITLE</TableCell>
                      <TableCell style={{ color: '#dddcdc' }}>ALBUM</TableCell>
                      <TableCell style={{ color: '#dddcdc' }}><AiFillClockCircle /></TableCell>
                      <TableCell style={{ color: '#dddcdc' }}>Download</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedPlaylist.tracks.map(
                      (
                        {
                          id,
                          name,
                          artists,
                          image,
                          duration,
                          album,
                          context_uri,
                          track_number,
                        },
                        index
                      ) => {
                        return (
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            key={id}
                            onClick={() =>
                              playTrack(
                                id,
                                name,
                                artists,
                                image,
                                context_uri,
                                track_number
                              )
                            }
                          >
                            <TableCell style={{ color: "#b3b3b3" }}>{index + 1}</TableCell>
                            <TableCell>
                              <div className="d-flex">
                                <div className="trackImage">
                                  <img src={image} alt="track" />
                                </div>
                                <div className="flex flex-column ms-3">
                                  <div className="nameSongs">
                                    <span>{name}</span>
                                  </div>
                                  <div className="artistsName">
                                    <span>{artists}</span>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="artistsName">
                              {album}
                            </TableCell>
                            <TableCell className="artistsName">
                              <span>{msToMinutesAndSeconds(duration)}</span>
                            </TableCell>
                            <TableCell>
                              <DownloadSongs downloadID={id} />
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        )
      }
    </div>
  );
}
