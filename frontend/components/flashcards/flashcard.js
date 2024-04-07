import { Box, Typography } from "@mui/material";
import Flip from "react-card-flip";
// learnName = what is being learned ex: 1, 2, 3, in counting
// cardName = associated imagery demonstrated by the card img
function flashcards({ cardImg, cardName, learnName }) {
  return (
    <Box
      sx={{
        padding: "36px",
        border: "6px solid #D1E4EE",
        borderRadius: "22px",
        width: "fit-content",
      }}
    >
      <img src={cardImg} />
      <Typography
        sx={{
          fontSize: "3rem",
          color: "#535562",
          fontWeight: "900",
        }}
      >
        {cardName}
      </Typography>
      <Typography
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
      </Typography>
    </Box>
  );
}

export default flashcards;
