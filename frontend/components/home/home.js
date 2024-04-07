'use client'
import {Box, Stack, Typography, TextField, Button} from '@mui/material'
import SelectionButton from './selectionButton'

export default function Home() {
  return (
    <Box
      width="100%"
      height="100%"
      position="absolute"
      top={0}
      left={0}
      overflow={'hidden'}
      padding="36px"
      sx={{
        backgroundImage: 'url(/home.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Stack
        width="50.21%"
        height="66.17%"
        direction="column"
        spacing="4rem"
        alignItems="center"
        justifyContent="center"
      >
        <SelectionButton />
        <Typography
          sx={{
            color: 'var(--pink, #FF7AAA)',
            textAlign: 'center',
            WebkitTextStrokeWidth: 2,
            WebkitTextStrokeColor: '#FFF',
            fontFamily: 'Poppins',
            fontSize: '6.25rem',
            color: 'var(--pink, #FF7AAA)',
            textAlign: 'center',
            WebkitTextStrokeWidth: 4,
            WebkitTextStrokeColor: '#FFF',
            fontFamily: 'Poppins',
            fontSize: '6.25rem',
            fontWeight: 900,
          }}
        >
          Sing!
        </Typography>
        <TextField
          fullWidth
          placeholder="What do you want to sing about?"
          sx={{
            borderRadius: '38px',
            background: '#FFF',
            boxShadow: '15.444px 15.444px 0px 0px #D1E4EE',
            borderRadius: '38px',
            background: '#FFF',
            boxShadow: '15.444px 15.444px 0px 0px #D1E4EE',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
            },
          }}
          InputProps={{
            style: {
              color: '#9A9A9A',
              fontFamily: 'Poppins',
              fontSize: '2.57406rem',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: 'normal',
            },
          }}
        />
        <Button
          sx={{
            width: '31.5rem',
            height: '9.6rem',
            borderRadius: '38.333px',
            background: 'var(--pink, #FF7AAA)',
            boxShadow: '19.166px 19.166px 0px 0px #F9367C',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <MusicSvg />
            <Typography
              sx={{
                color: '#FFF',
                fontFamily: 'Poppins',
                fontSize: '3.19rem',
                fontWeight: 800,
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              Play
            </Typography>
            <MusicSvg />
          </Stack>
        </Button>
      </Stack>
    </Box>
  )
}

const MusicSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="56"
    height="57"
    viewBox="0 0 56 57"
    fill="none"
  >
    <path
      d="M48.7626 7.93481V36.9597C48.7626 39.1151 47.9063 41.1823 46.3822 42.7064C44.8581 44.2305 42.791 45.0867 40.6356 45.0867C38.4802 45.0867 36.413 44.2305 34.8889 42.7064C33.3648 41.1823 32.5086 39.1151 32.5086 36.9597C32.5086 34.8043 33.3648 32.7372 34.8889 31.2131C36.413 29.689 38.4802 28.8328 40.6356 28.8328C41.8895 28.8328 43.0737 29.1114 44.1186 29.6222V15.9921L20.8986 20.938V41.6037C20.8986 43.7591 20.0424 45.8263 18.5183 47.3504C16.9942 48.8745 14.9271 49.7307 12.7717 49.7307C10.6163 49.7307 8.54912 48.8745 7.02502 47.3504C5.50092 45.8263 4.64468 43.7591 4.64468 41.6037C4.64468 39.4483 5.50092 37.3812 7.02502 35.8571C8.54912 34.333 10.6163 33.4767 12.7717 33.4767C14.0255 33.4767 15.2098 33.7554 16.2547 34.2662V14.9008L48.7626 7.93481Z"
      fill="white"
    />
  </svg>
)
