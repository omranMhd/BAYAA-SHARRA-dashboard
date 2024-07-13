import Box from "@mui/material/Box";

function PhotoSlide({ img }) {
  return (
    <Box
      sx={{
        height: "460px",
        // width: "930px",
        // backgroundImage:
        //   "url(https://source.unsplash.com/random?wallpapers)",
        backgroundImage: `url(${img})`, // Set the background image
        backgroundSize: "cover", // Cover the entire Box with the image
        backgroundPosition: "center",
        borderRadius: "10px",
        margin: "10px",
        "&:hover": {
          // backgroundColor: alpha(theme.palette.common.white, 0.50),
          // border: "3px solid #153258",
          boxShadow: "0px 0px 6px 2px #1f8ccc",
        },
      }}
    ></Box>
  );
}

export default PhotoSlide;
