import { Box, Typography, Chip } from "@mui/material";
import React from "react";

function Lesson({ lessonImg, lessonName, time }) {
  return (
    <Box
      padding="36px"
      borderRadius="36px"
      border={`8px solid #D1E4EE`}
      backgroundColor="#FFF"
      alignContent={"center"}
      justifyContent={"center"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={"20px"}
    >
      <img src={lessonImg} />
      <Typography
        sx={{
          color: "#676767",
          fontFamily: "Poppins",
          fontSize: "2.5rem",
          fontStyle: "normal",
          fontWeight: "900",
          lineHeight: "normal",
          textAlign: "center",
        }}
      >
        {lessonName}
      </Typography>
      <Box
        backgroundColor="#D1E4EE"
        borderRadius="12px"
        padding="8px 14px"
        width={"fit-content"}
      >
        <Typography
          fontWeight="900"
          fontSize={"1.6rem"}
          color="#676767"
          textAlign="center"
        >
          {time}
        </Typography>
      </Box>
    </Box>
  );
}

export default Lesson;
