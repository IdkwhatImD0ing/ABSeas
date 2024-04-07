import Home from '@/components/home/home'
import {Box} from '@mui/material'
export default function Default() {
  return (
    <Box width="100vw" height="100vh" top={0} left={0} overflow={'hidden'}>
      <Home />
    </Box>
  )
}
