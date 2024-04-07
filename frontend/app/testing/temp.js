import { useState } from "react";

function handleLessonClick(lessonName) {


    setSong(prevSong => ({
        ...prevSong, // Keep the existing state
        ...data // Override with new data
      }));

    const [song, setSong] = useState({
        isFinished: true,
        lyrics: '',
        songAudio: null,
        transcript: [],
        metadata: [],
        mediaSource: null,
      })


    console.log(`Lesson clicked: ${lessonName}`);
    // Add more actions as needed
  }
  

  var file_path;
  if (lessonName == "sharing"){
    file_path = "fish3296dc15-872e-452f-8b89-d8a334fb5d47.json";
  } else if (lessonName == "counting"){
    file_path = "granite27939142-8cf9-4f02-8499-8d55f4567671.json";
  }

  // Get data from firebase
  