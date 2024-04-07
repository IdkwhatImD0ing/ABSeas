"use client";

import React, { useState, useEffect } from "react";
import { storage } from "../../app/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";

function AudioDownloadLink({ filename }) {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filename) {

      const audioRef = ref(storage, `songs/${filename}`);

      getDownloadURL(audioRef)
        .then((url) => {
          setDownloadUrl(url);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error getting download URL", error);
          setLoading(false); 
        });
    }
  }, [filename]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return downloadUrl ? (
    <audio src={downloadUrl} controls>
      Your browser does not support the <code>audio</code> element.
    </audio>
  ) : (
    <p>Unable to load audio file.</p>
  );
}

export default AudioDownloadLink;
