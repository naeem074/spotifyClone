import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Beataudio from './Beataudio'
import UserLibrary from './UserLibrary'
import Playlists from './Playlists'
import Search from './Search'

export default function Layout() {
    return (
        <>
            <BrowserRouter>
                <Beataudio>
                    <Routes>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/search"} element={<Search />} />
                        <Route path={"/userLibray"} element={<UserLibrary />} />
                        <Route path={"/playlists"} element={<Playlists />} />
                    </Routes>
                </Beataudio>
            </BrowserRouter>
        </>
    )
}
