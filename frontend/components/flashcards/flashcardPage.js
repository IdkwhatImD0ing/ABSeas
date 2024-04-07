import { Box, Typography, Grid } from "@mui/material";
import Flashcards from "./flashcard";
function flashcardsPage() {
  // Array of 6 elements
  const flashcards = Array.from({ length: 6 }, (v, i) => i);
  return (
    <Box
      width="100%"
      height="100%"
      position="absolute"
      top={0}
      left={0}
      overflow={"hidden"}
      backgroundColor="#50B5FF"
      padding="36px"
      gap="22px"
      display="flex"
      flexDirection="column"
    >
      <Typography
        sx={{
          fontSize: "4.2rem",
          fontWeight: "900",
          textShadow: `
          -4px -4px 0 #fff,  
           4px -4px 0 #fff,
          -4px  4px 0 #fff,
           4px  4px 0 #fff,
          -4px  0 0 #fff,
           4px  0 0 #fff,
           0  -4px 0 #fff,
           0   4px 0 #fff`,
          color: "var(--pink, #FF7AAA)",
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
          padding: "36px",
          // border: "14px solid #",
          backgroundColor: "#fff",
          borderRadius: "36px",
          minHeight: "50vh",
        }}
      >
        {flashcards.map((card, index) => (
          <Grid
            height="50%"
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Flashcards
              cardImg=""
              cardName="hello"
              learnName="hello"
            ></Flashcards>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default flashcardsPage;
