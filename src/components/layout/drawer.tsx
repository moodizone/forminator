import { Box, Drawer, Typography, useMediaQuery } from "@mui/material";

interface PropsType {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

function Sidebar({ handleDrawerToggle, mobileOpen }: PropsType) {
  // auto-hides on mobile viewports
  const isMobile = useMediaQuery("(max-width:750px)");
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
            width: 250,
            paddingX: 2,
            paddingBottom: 2,
            // calculated based on toolbar's height (56 and 64)
            paddingTop: isMobile ? 8 : 9,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Sidebar
          </Typography>
          <Typography>This is the sidebar content.</Typography>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
