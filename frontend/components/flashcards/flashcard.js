import {Box} from '@mui/material'
import Flip from "react-card-flip"
// learnName = what is being learned ex: 1, 2, 3, in counting
// cardName = associated imagery demonstrated by the card img
function flashcards({cardImg, cardName, learnName}) {
  return (
   <Box
    sx={{
        padding:'36px'

    }}
   >
        <img src={cardImg} />
        <h2>
            {cardName}
        </h2>
   </Box>
  )
}

export default flashcards
