import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import logo from "../assests/logo.png";
import "../styles/sidebar.css";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary, } from "react-icons/io5";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import { CgProfile } from "react-icons/cg";
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import Playlist from './Playlist';
import Footer from './Footer';
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const drawerWidth = 240;

export default function CommonSidebar({ children }) {
  // voice function
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  // custom state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [{ userInfo }] = useStateProvider();

  // mobile drawer function
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [{ token }, dispatch] = useStateProvider();
  const [query, setQuery] = useState('');
  
  // set voice into textfield function
useEffect(()=>{
  if(transcript){
    setQuery(transcript)
  }

},[transcript])

  // search data function
  const handleSearch = () => {
    const accessToken = token
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data, "search data");
        dispatch({ type: reducerCases.SEARCH_SONGS, searchSongs: data.tracks.items });
        
      })
      .catch(error => console.log(error));
  }

  // set data into textfield
  const handleInputChange = (event) => {
      setQuery(event.target.value)
  };
  const drawer = (
    // sidebar links 
    <div className="container">
      <div className="top__links">
        <div className="logo">
          <img src={logo} alt="spotify" />
          <h1>Beat Audio.</h1>
        </div>
      </div>
      <ul>
        <li>
          <Link to="/" style={{ textDecoration: "none" }} className='linkText'>
            <span>
              <MdHomeFilled className='icons' size={18} />
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link to="/search" style={{ textDecoration: "none" }} className='linkText'>
            <span>
              <MdSearch className='icons' size={18} />
              Search
            </span>
          </Link>
        </li>
        <li>
          <Link to="/userLibray" style={{ textDecoration: "none" }} className='linkText'>
            <span>
              <IoLibrary className='icons' size={18} />
              Your Library
            </span>
          </Link>
        </li>
        <li>
          <Link to="/playlists" style={{ textDecoration: "none" }} className='linkText'>
            <span>
              <AiFillPlayCircle className='icons' size={18} />
              Playlists
            </span>
          </Link>
        </li>
      </ul>
      <Playlist />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        style={{
          backgroundColor: `${({ navBackground }) =>
            navBackground ? "rgba(0,0,0,0.7)" : "none"}`
        }}
        className='navContainer'
      >
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between', p: { sx: '0px 0px', sm: '20px 30px' } }}
        >
          {/* drawer button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* search bar */}
          <Link to="/search" style={{ textDecoration: "none" }}>
            <Paper
              component="form"
              sx={{ p: '4px 10px', display: 'flex', alignItems: 'center', width: 400, borderRadius: 50, }}
              className='customInput'
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Artists, songs, or podcasts"
                inputProps={{ 'aria-label': 'Artists, songs, or podcasts' }}
                type="text"
                value={query}
                onChange={handleInputChange}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton color= {listening ? "error" : "primary"} sx={{ p: '10px' }} aria-label="directions" onClick={SpeechRecognition.startListening}>
                <SettingsVoiceIcon />
              </IconButton>
            </Paper>
          </Link>
          {/* profile avatar */}
          <div className='avatarContainer'>
            <div className="avatar">
              <a href={userInfo?.userUrl}>
                <i><CgProfile /></i>
                <span>{userInfo?.name}</span>
              </a>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* body */}
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        className='mainColor'
        paddingTop={15}
      >
        {children}
        <div className='footerContainer'>
          <Footer />
        </div>
      </Box>
    </Box>
  );
}
