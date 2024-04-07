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
    >
      <Stack
        width="50.21%"
        height="66.17%"
        direction="column"
        spacing="4.875rem"
        position="relative"
        top="11.3%"
        left="32.7%"
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
            width: '52.31%',
            height: '26.93%',
            borderRadius: ' 38.333px',
            background: 'var(--pink, #FF7AAA)',
            boxShadow: '19.166px 19.166px 0px 0px #F9367C',
          }}
        >
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: 'Poppins',
              fontSize: '3.19rem',
              fontWeight: 800,
            }}
          >
            Play
          </Typography>
        </Button>
      </Stack>
    </Box>
  )
}
