import React, { useEffect, useState } from 'react'
import { useStateProvider } from "../utils/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import "../styles/home.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DownloadSongs from './DownloadSongs';

export default function Search() {
  // redux hook
  const [{ searchSongs, }] = useStateProvider();
  const [voiceSearchSongs, setVoiceSearchSongs] = useState(searchSongs)

  // get search songs function
  useEffect(() => {
    // console.log(searchSongs, "searchSongsLog");
    setVoiceSearchSongs(searchSongs)
  }, [searchSongs])

// convert time milisecound into min or sec function
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 650, marginBottom: 20, minHeight: 440 }} aria-label="simple table" >
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
            {voiceSearchSongs?.map(
              (
                track,
                index
              ) => {
                console.log(track, "search gongs play");
                return (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={track?.id}
                  >
                    <TableCell style={{ color: "#b3b3b3" }}>{index + 1}</TableCell>
                    <TableCell>
                      <div className="d-flex">
                        <div className="trackImage">
                          <img src={track?.album?.images[0]?.url} alt="track" />
                        </div>
                        <div className="flex flex-column ms-3">
                          <div className="nameSongs">
                            <span>{track?.name}</span>
                          </div>
                          <div className="artistsName">
                            <span>{track?.artists[0]?.name}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="artistsName">
                      {track?.album?.name}
                    </TableCell>
                    <TableCell className="artistsName">
                      <span>{msToMinutesAndSeconds(track?.duration_ms)}</span>
                    </TableCell>
                    <TableCell>
                      <DownloadSongs downloadID={track?.id} />
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
