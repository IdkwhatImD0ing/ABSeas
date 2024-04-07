import Home from "@/components/Home/Home";
import { Box } from "@mui/material";
import FlashcardPage from "@/components/flashcards/flashcardPage";
import LyricsPage from "@/components/lyricsPage";
export default function Default() {
  return (
    <Box width="100vw" height="100vh" top={0} left={0} overflow={"hidden"}>
      {/* <Home /> */}
      {/* <FlashcardPage /> */}
      <LyricsPage lyrics="hello" />
    </Box>
  );
}
