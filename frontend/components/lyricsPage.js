"use client";
import { useState, React, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

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

function LyricsPage({ lyrics }) {
  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "fit-content",
          padding: "22px 36px",
          margin: "36px",
          border: "6px solid #D1E4EE",
          borderRadius: "22px",
          backgroundColor: "#FFF",
          margin: "20px auto",
        }}
      >
        <Typography
          sx={{
            color: "#535562",
            textAlign: "center",
            fontFamily: "Poppins",
            fontSize: "2.55625rem",
            fontWeight: "800",
          }}
        >
          {lyrics}
        </Typography>
      </Box>
      <RandomPositionedImages />
    </Box>
  );
}

export default LyricsPage;
