import {Box, Typography} from '@mui/material'
import ReactCardFlip from 'react-card-flip'
import {useState} from 'react'
// learnName = what is being learned ex: 1, 2, 3, in counting
// cardName = associated imagery demonstrated by the card img
export default function Flashcards({cardImg, cardName, learning, audio}) {
  const [isFlipped, setIsFlipped] = useState(false)
  function playAudio() {
    // Decode the base64 string to a byte array
    const audioBytes = atob(audio) // Convert base64 to binary string
    const bytes = new Uint8Array(audioBytes.length)
    for (let i = 0; i < audioBytes.length; i++) {
      bytes[i] = audioBytes.charCodeAt(i)
    }

    // Create a blob from the byte array
    const blob = new Blob([bytes], {type: 'audio/mpeg'}) // Assuming audio is in MP3 format; adjust the MIME type if necessary

    // Create an object URL for the blob
    const audioUrl = URL.createObjectURL(blob)

    // Create a new audio element and play it
    const audioElement = new Audio(audioUrl)
    audioElement
      .play()
      .then(() => {
        console.log('Audio is playing')
      })
      .catch((error) => {
        console.error('Error playing audio:', error)
      })

    // Optional: Revoke the object URL after playback is finished to release memory
    // This can be done by listening to the 'ended' event on the audio element, or managing lifecycle in React component if needed
    audioElement.addEventListener('ended', () => {
      URL.revokeObjectURL(audioUrl)
    })
  }

  return (
    <Box
      height="100%"
      sx={{
        padding: '36px',
        border: '6px solid #D1E4EE',
        borderRadius: '22px',
        width: '28vw',
        display: 'flex', // Added to center the content vertically and horizontally
        flexDirection: 'column', // Stack items vertically
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center', // Center items vertically
      }}
      onClick={() => {
        playAudio()
        setIsFlipped(!isFlipped)
      }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <>
          <img // cardImg is base64 encoded image
            src={`data:image/png;base64,${cardImg}`}
            alt="card"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
          <Typography
            sx={{
              color: '#535562',
              textAlign: 'center',
              fontFamily: 'Poppins',
              fontSize: '2.75625rem',
              fontWeight: '800',
            }}
          >
            {cardName}
          </Typography>
        </>
        <Typography
          sx={{
            color: '#535562',
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontSize: '2.75625rem',
            fontWeight: '800',
          }}
        >
          {learning}
        </Typography>
      </ReactCardFlip>
      {/* <Typography
        sx={{
          fontSize: "2rem",
          color: "#535562",
          fontWeight: "900",
          backgroundColor: "#FF7AAA",
          color: "#fff",
          textAlign: "center",
          padding: "8px 12px",
          borderRadius: "12px",
        }}
      >
        {learnName}
      </Typography> */}
    </Box>
  )
}
