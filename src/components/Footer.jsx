import React from "react";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";
import "../styles/footer.css";

export default function Footer() {
  return (
    <div className="footerDiv">
      <CurrentTrack />
      <PlayerControls />
      <Volume />
    </div>
  );
}

