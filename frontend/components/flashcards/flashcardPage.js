import { Box, Typography } from "@mui/material";
function flashcardsPage() {
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
      <Box
        sx={{
          padding: "36px",
          // border: "14px solid #",
          backgroundColor: "#fff",
          borderRadius: "36px",
          minHeight: "50vh"
        }}
      >
        
      </Box>
    </Box>
  );
}

export default flashcardsPage;
