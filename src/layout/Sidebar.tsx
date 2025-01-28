import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";


import { useFormSlice } from "../store/form";

interface PropsType {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

function Sidebar({ handleDrawerToggle, mobileOpen }: PropsType) {
  // auto-hides on mobile viewports based on `sm` breakpoint
  const isMobile = useMediaQuery("(max-width:600px)");
  const { forms } = useFormSlice();
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: 250 },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            paddingX: 0,
            paddingBottom: 2,
            // calculated based on toolbar's height
            paddingTop: isMobile ? "56px" : "64px",
          }}
        >
          <List sx={{ width: "100%", maxWidth: 360 }} component="nav">
            {forms.map((form) => (
              <ListItemButton
                component={Link}
                to={`/form/${form.id}`}
                key={form.id}
              >
                <ListItemText primary={form.name} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
