import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function Notfound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8, pt: 8 }}>
      <Typography variant="h1" fontWeight="bold" gutterBottom>
        {"404"}
      </Typography>
      <Typography variant="h4" color="text.primary" gutterBottom>
        {"Oops! Page Not Found"}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {"The page you’re looking for doesn’t exist or has been moved."}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
        >
          {"Back to Home"}
        </Button>
      </Box>
    </Container>
  );
}

export default Notfound;
