import React, {useContext, useEffect, useRef} from 'react'
import SongContext from './SongContext'

const getRandomPosition = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function RandomPositionedImages() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    console.log(maxX);
    const newPositions = Array.from({ length: 6 }, () => ({
      // distance from left
      // distance from top
      x: getRandomPosition(0, maxX),
      y: getRandomPosition(0, maxY),
    }));

    setPositions(newPositions);
  }, []);
  const wiggleAnimation = {
    animate: {
      rotate: [0, 10, -10, 10, -10, 0],
      transition: { repeat: Infinity, duration: 2 },
    },
  };
  return (
    <>
      {positions.map((pos, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            left: `${pos.x}px`,
            top: `${pos.y}px`,
          }}
        >
          <motion.img src="./turtle.svg" alt="Turtle" {...wiggleAnimation} />
        </Box>
      ))}
    </>
  );
}

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
        flexDirection="column"
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
              fontSize: '1.75625rem',
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
