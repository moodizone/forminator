import * as React from "react";
import { Box, TextField, Grid } from "@mui/material";
import FormBuilder from "../Form/FormBuilder";

function Content() {
  const [jsonSchema, setJsonSchema] = React.useState<string>("");
  const deferredSchema = React.useDeferredValue(jsonSchema);

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
          <TextField
            label="JSON Schema"
            multiline
            rows={20}
            fullWidth
            variant="outlined"
            value={jsonSchema}
            onChange={(event) => {
              setJsonSchema(event.target.value);
            }}
            sx={{
              "& .MuiInputBase-root": {
                fontFamily: "monospace",
                fontSize: "14px",
              },
            }}
          />
        </Grid>
        <FormBuilder deferredSchema={deferredSchema} />
      </Grid>
    </Box>
  );
}

export default Content;
