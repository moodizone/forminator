import * as React from "react";
import { Box, Grid } from "@mui/material";
import FormBuilder from "../components/Form/FormBuilder";
import JSONEditor from "../components/Form/JSONEditor";

function Content() {
  const [deferredValue, setDeferredValue] = React.useState<string>("");

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        // based on drawer's width
        width: { sm: `calc(100% - 250px)` },

        // based on tooltip's `min-height`
        marginTop: "64px",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <JSONEditor setDeferredValue={setDeferredValue} />
        </Grid>
        <FormBuilder deferredValue={deferredValue} />
      </Grid>
    </Box>
  );
}

export default Content;
