import {Box, Typography, Grid} from '@mui/material'
import {useContext} from 'react'
import NavBar from '../navBar'
import Flashcards from './flashcard'
import SongContext from '../SongContext'
function FlashcardsPage() {
  // Array of 6 elements
  const {song} = useContext(SongContext)
  return (
    <Box
      width="100%"
      height="100%"
      position="absolute"
      top={0}
      left={0}
      overflow={'hidden'}
      backgroundColor="#50B5FF"
      padding="36px"
      gap="22px"
      display="flex"
      flexDirection="row"
    >
      <NavBar />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <Typography
          sx={{
            fontSize: '4.2rem',
            fontWeight: '900',
            textShadow: `
          -4px -4px 0 #fff,  
           4px -4px 0 #fff,
          -4px  4px 0 #fff,
           4px  4px 0 #fff,
          -4px  0 0 #fff,
           4px  0 0 #fff,
           0  -4px 0 #fff,
           0   4px 0 #fff`,
            color: 'var(--pink, #FF7AAA)',
          }}
        >
          Your music cards
        </Typography>
        <Grid
          width="100%"
          height="90%"
          spacing={2}
          container
          sx={{
            padding: '36px',
            // border: "14px solid #",
            backgroundColor: '#fff',
            borderRadius: '36px',
            minHeight: '50vh',
          }}
        >
          {song.metadata.map((card, index) => (
            <Grid
              height="50%"
              item
              xs={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Flashcards
                cardImg={card.image}
                cardName={card.word}
                learning={card.learning}
                audio={card.audio}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default FlashcardsPage
