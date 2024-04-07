import React from 'react'

function lyricsPage({lyrics}) {
  return (
    <Box
        display="flex"
        justifyContent="flex-start"
        width= "fit-content"
        padding= "36px"
        border= "6px solid #D1E4EE"
        borderRadius= "22px"
    > 
        <Typography
            sx={{
                color: "#535562",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "2.75625rem",
                fontWeight: "800",
              }}
        >
            {lyrics} 
        </Typography>
       
    </Box>
    
  )
}

export default lyricsPage
