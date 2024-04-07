import { Box } from "@mui/material";
import React from "react";
import SelectionButton from "./selectionButton";

function LessonsPage() {
  return (
    <Box>
      <SelectionButton />
      <Typography
        sx={{
          color: "var(--pink, #FF7AAA)",
          textAlign: "center",
          fontFamily: "Poppins",
          fontSize: "6.25rem",
          fontWeight: 900,
          textShadow: `
          -4px -4px 0 #fff,  
           4px -4px 0 #fff,
          -4px  4px 0 #fff,
           4px  4px 0 #fff,
          -4px  0 0 #fff,
           4px  0 0 #fff,
           0  -4px 0 #fff,
           0   4px 0 #fff`,
        }}
      >
        Lessons
      </Typography>
      <Box>
        <Stack direction="row" spacing={2}>
            <Lesson
                lessonImg = " ./numbers.svg"
                lessonName = "Counting"
                time = "2 minutes"
            />
        </Stack>
      </Box>
    </Box>
  );
}

export default LessonsPage;
