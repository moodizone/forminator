import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";

interface PropsType {
  handleDrawerToggle: () => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
}

function Header({ darkMode, handleDrawerToggle, toggleDarkMode }: PropsType) {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          {"Dynamic form builder"}
        </Typography>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
