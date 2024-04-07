"use client";

import React, { useEffect, useState } from 'react';
import AudioDownloadLink from "../../components/AudioDownloadLink/AudioDownloadLink";
import { fetchInfo } from "../firebaseHelper";

function Testing() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const defaultInfo = await fetchInfo(
          "fish3296dc15-872e-452f-8b89-d8a334fb5d47.json"
        );
        setInfo(defaultInfo);
      } catch (error) {
        console.error("Error loading info:", error);
      }
    };

    fetchData();
  }, []);

  if (!info) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Download Songs</h1>
      <AudioDownloadLink filename="music.mp3" />
      <AudioDownloadLink filename="test1.mp3" />
    </div>
  );
}

export default Testing;
