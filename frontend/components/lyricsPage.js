import React, {useContext, useEffect, useRef} from 'react'
import SongContext from './SongContext'
import {Box, Typography} from '@mui/material'

function LyricsPage() {
  const {song} = useContext(SongContext)
  const audioElementRef = useRef(null)

  useEffect(() => {
    if (song.mediaSource && audioElementRef.current) {
      const objectURL = URL.createObjectURL(song.mediaSource)
      audioElementRef.current.src = objectURL
      audioElementRef.current.play().catch((error) => {
        console.error('Autoplay failed', error)
      })

      return () => {
        URL.revokeObjectURL(objectURL) // Clean up when the component unmounts or the source changes
      }
    }
  }, [song.mediaSource])

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      width="fit-content"
      padding="36px"
      border="6px solid #D1E4EE"
      borderRadius="22px"
    >
      {song.lyrics && (
        <Typography
          sx={{
            color: '#535562',
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontSize: '2.75625rem',
            fontWeight: '800',
          }}
        >
          {song.lyrics}
        </Typography>
      )}
      <audio ref={audioElementRef} controls />
    </Box>
  )
}

export default LyricsPage
