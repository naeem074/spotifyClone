import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function DownloadSongs({ downloadID }) {
    // console.log(downloadID, "song download");

    // redux hook
    const [{ token }, dispatch] =
        useStateProvider();

    // download song function
    const downloadSongHandler = () => {
        const apiUrl = `https://api.spotify.com/v1/tracks/${downloadID}`;

        axios({
            url: apiUrl,
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            responseType: 'blob' // important to set the response type to 'blob'
        })
            .then(response => {
                // handle the downloaded file here
                const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
                // console.log(downloadUrl, 'downloadUrl');
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'song.mp3');
                document.body.appendChild(link);
                link.click();
                link.remove();
                dispatch({ type: reducerCases.DOWNLOAD_SONG, downloadSong: downloadUrl });
            })
            .catch(error => {
                console.error('Failed to download the song', error);
            });
    }
    return (
        <>
            <IconButton aria-label="delete" size="large" sx={{ color: '#dddcdc' }} onClick={downloadSongHandler}>
                <DownloadIcon />
            </IconButton>
        </>
    )
}
