import React, {useState, useContext, useEffect, useRef} from 'react'
import SongContext from './SongContext'
import {Box, Typography, Button, Stack} from '@mui/material'
import {motion} from 'framer-motion'

const getRandomPosition = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getRandomVelocity = () =>
  (Math.random() > 0.5 ? 5 : -5) * (Math.random() * 2 + 1)

function LyricsPage({setPage}) {
  const {song} = useContext(SongContext)
  const [positions, setPositions] = useState([])
  const [velocities, setVelocities] = useState([])
  const audioElementRef = useRef(null)
  // song.metadata = list of objects with a key image that is a base64 image

  useEffect(() => {
    const maxX = window.innerWidth - 250
    const maxY = window.innerHeight - 250

    const newPositions = Array.from({length: 6}, () => ({
      x: getRandomPosition(0, maxX),
      y: getRandomPosition(0, maxY),
    }))

    const newVelocities = Array.from({length: 6}, () => ({
      vx: getRandomVelocity(),
      vy: getRandomVelocity(),
    }))

    setPositions(newPositions)
    setVelocities(newVelocities)
  }, [])

  useEffect(() => {
    const updatePosition = () => {
      setPositions((currentPositions) =>
        currentPositions.map((pos, index) => {
          let newX = pos.x + velocities[index].vx
          let newY = pos.y + velocities[index].vy

          // Check for window boundaries and reverse velocity if needed
          if (newX <= 0 || newX >= window.innerWidth - 250)
            velocities[index].vx *= -1
          if (newY <= 0 || newY >= window.innerHeight - 250)
            velocities[index].vy *= -1

          return {
            x: newX,
            y: newY,
          }
        }),
      )
    }

    const intervalId = setInterval(updatePosition, 25) // Adjust interval for smoother or faster animation

    return () => clearInterval(intervalId)
  }, [velocities])

  const wiggleAnimation = {
    animate: {
      rotate: [0, 10, -10, 10, -10, 0],
      transition: {repeat: Infinity, duration: 2},
    },
  }

  useEffect(() => {
    const audioElement = audioElementRef.current

    if (song.mediaSource && audioElement) {
      const objectURL = URL.createObjectURL(song.mediaSource)
      audioElementRef.current.src = objectURL
      // karaoke effect
      const handleTimeUpdate = () => {
        console.log('Current Time:', audioElement.currentTime)
      }
      audioElement.addEventListener('timeupdate', handleTimeUpdate)

      audioElement.play().catch((error) => {
        console.error('Autoplay failed', error)
      })

      return () => {
        URL.revokeObjectURL(objectURL) // Clean up when the component unmounts or the source changes
        audioElement.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [song.mediaSource])

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      padding="36px"
      overflow="hidden"
      bgcolor="#50B5FF"
    >
      {song.lyrics ? (
        <div>
          {song.lyrics.split("\n").map((line, index) => {
            console.log(line, index);
            return (
              <Typography
                sx={{
                  color: '#535562',
                  textAlign: 'center',
                  fontFamily: 'Poppins',
                  fontSize: '1.75625rem',
                  fontWeight: '800',
                }}
              >
                {line.includes("[") && index === 1 ? (
                  ""
                ) : line.includes("[") ? (
                  <br />
                ) : (
                  line
                )}
              </Typography>
            );
          })}
      {positions.map((pos, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: `${pos.x}px`,
            top: `${pos.y}px`,
          }}
        >
          <motion.img
            height="250px"
            width="250px"
            src={`data:image/png;base64,${
              song.metadata && song.metadata[index]
                ? song.metadata[index].image
                : ''
            }`}
            alt="Dynamic object"
            {...wiggleAnimation}
          />
        </Box>
      ))}
        </div>
      ) : null}

      <audio ref={audioElementRef} controls style={{ margin: "auto" }} />
      <Button
        onClick={() => {
          setPage(2)
        }}
        sx={{
          position: 'absolute',
          bottom: '3.2rem',
          right: '3.2rem',
          width: '19.0625rem',
          height: '7.63rem',
          borderRadius: '1.91288rem 2.5505rem',
          background: 'var(--pink, #FF7AAA)',
          boxShadow: '15.303px 15.303px 0px 0px #F9367C',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: 'Poppins',
              fontSize: '2.55rem',
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            Done
          </Typography>

          <Arrow />
        </Stack>
      </Button>
    </Box>
  )
}

export default LyricsPage

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
  >
    <g clip-path="url(#clip0_13_814)">
      <path
        d="M47.8974 30.5392C48.5422 29.8936 48.9044 29.0185 48.9044 28.106C48.9044 27.1936 48.5422 26.3184 47.8974 25.6728L34.9141 12.6826C34.2682 12.0367 33.3921 11.6738 32.4786 11.6738C31.5651 11.6738 30.689 12.0367 30.0431 12.6826C29.3972 13.3286 29.0343 14.2047 29.0343 15.1182C29.0343 16.0317 29.3972 16.9077 30.0431 17.5537L37.1499 24.6628L10.6715 24.6628C9.7583 24.6628 8.88251 25.0255 8.23678 25.6713C7.59105 26.317 7.22828 27.1928 7.22828 28.106C7.22828 29.0192 7.59105 29.895 8.23678 30.5407C8.88251 31.1865 9.7583 31.5492 10.6715 31.5492L37.1499 31.5492L30.0431 38.6561C29.7233 38.9759 29.4696 39.3556 29.2965 39.7735C29.1234 40.1914 29.0343 40.6392 29.0343 41.0916C29.0343 41.5439 29.1234 41.9918 29.2965 42.4097C29.4696 42.8275 29.7233 43.2072 30.0431 43.5271C30.3629 43.8469 30.7426 44.1006 31.1605 44.2737C31.5784 44.4468 32.0263 44.5359 32.4786 44.5359C32.9309 44.5359 33.3788 44.4468 33.7967 44.2737C34.2146 44.1006 34.5943 43.8469 34.9141 43.5271L47.8974 30.5392Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_13_814">
        <rect
          width="55.0916"
          height="55.0916"
          fill="white"
          transform="matrix(0 1 -1 0 55.4335 0.560059)"
        />
      </clipPath>
    </defs>
  </svg>
)
