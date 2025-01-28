import { Box, Typography } from "@mui/material";

function Content() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - 250px)` },
        marginTop: "64px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Form Content
      </Typography>
    </Box>
  );
}

export default Content;
