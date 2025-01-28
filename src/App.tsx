import React from "react";
import {
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  PaletteMode,
} from "@mui/material";

import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Router from "./router";

function getTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }
        : {
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
          }),
    },
  });
}

function App() {
  //================================
  // Init
  //================================
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(true);
  const theme = getTheme(darkMode ? "dark" : "light");

  //================================
  // Handlers
  //================================
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //================================
  // Render
  //================================
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Header
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode((prev) => !prev)}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Sidebar
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
        <Router />
      </Box>
    </ThemeProvider>
  );
}

export default App;
