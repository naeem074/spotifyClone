import axios from "axios";
import React, { useEffect } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import "../styles/playList.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "../styles/userLibrary.css";
import libraryImage from "../assests/images.jpg";
import { Link } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import {
  BsFillPlayCircleFill,
} from "react-icons/bs";
import IconButton from '@mui/material/IconButton';
import playListImg from "../assests/playList.jpg";

export default function UserLibrary() {
  // redux hook
  const [{ token, playlists }, dispatch] = useStateProvider();

  // get current user library function
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
      // console.log(response, "my library data");
      const { items } = response?.data;
      const playlists = items.map(({ name, id, owner, images }) => {
        return { name, id, owner, images };
      });
      // console.log(playlists, "library data");
      dispatch({ type: reducerCases?.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);
  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases?.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  return (
    <>
      <div className="container">
        <div className="row cardContainer">
          <div className="col-xxl-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-5">
            {/* liked songs */}
            <Link to="/" style={{ textDecoration: "none" }}>
              <Tooltip title="Play" placement="top">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={libraryImage}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        Liked Songs
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="play">
                          <BsFillPlayCircleFill />
                        </IconButton>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        One of the unique features of Spotify songs is the ability to add personal notes, such as lyrics, to individual tracks.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Tooltip>
            </Link>
          </div>

          {/* playlists */}
          {playlists.map(({ name, id, owner, images }) => {
            const cardImageLogo = images?.[1]?.url;
            // console.log(images, "cardImageLogo");
            return (
              <>
                <div className="col-xxl-3 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <Link to="/playlists" style={{ textDecoration: "none" }} key={id}>
                    <Tooltip title="Play" placement="top">
                      <Card onClick={() => changeCurrentPlaylist(id)}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="300"
                            image={cardImageLogo ? cardImageLogo : playListImg}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              {name}
                              <IconButton type="button" sx={{ p: '10px' }} aria-label="play">
                                <BsFillPlayCircleFill />
                              </IconButton>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              By
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Poppins", sans-serif', fontSize: '16px', fontWeight: 'bold', marginTop: '18px' }}>
                              {owner?.display_name}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Tooltip>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  )
}
