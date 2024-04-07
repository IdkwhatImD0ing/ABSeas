"use client";

import React from "react";
import AudioDownloadLink from "../../components/AudioDownloadLink/AudioDownloadLink"; 

function Testing() {
  return (
    <div>
      <h1>Download Songs</h1>
      <AudioDownloadLink filename="music.mp3" />
    </div>
  );
}

export default Testing;
