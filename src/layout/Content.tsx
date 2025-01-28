import { Box, Grid } from "@mui/material";
import { Navigate, useParams } from "react-router";

import FormBuilder from "../components/Form/FormBuilder";
import JSONEditor from "../components/Form/JSONEditor";
import { useFormSlice } from "../store/form";

function Content() {
  const { id } = useParams<{ id: string }>();
  const { getForm } = useFormSlice();
  const form = getForm(id);

  // id present however can't find correspond form
  if (id && !form) {
    return <Navigate to={"/404"} />;
  } else {
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
            <JSONEditor />
          </Grid>
          <FormBuilder />
        </Grid>
      </Box>
    );
  }
}

export default Content;
