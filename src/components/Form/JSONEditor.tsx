import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

import { useFormProvider } from "./FormProvider";

function JSONEditor() {
  //================================
  // Init
  //================================
  const { stringifyForm, setStringifyForm } = useFormProvider();
  const [value, setValue] = React.useState<string>("");

  //================================
  // Handlers
  //================================
  // reflect the outer changes to the internal state
  React.useEffect(() => {
    setValue(stringifyForm);
  }, [stringifyForm]);

  // improve performance by reducing the number of
  // times the emit logic is called during rapid input changes
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setStringifyForm(value);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [value, setStringifyForm]);

  function handleBeautify() {
    try {
      const parsedJson = JSON.parse(value);
      const beautifiedJson = JSON.stringify(parsedJson, null, 2);
      setValue(beautifiedJson);
    } catch {
      // ignore errors
    }
  }

  //================================
  // Render
  //================================
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="JSON Schema"
          multiline
          rows={20}
          fullWidth
          variant="outlined"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          sx={{
            "& .MuiInputBase-root": {
              fontFamily: "monospace",
              fontSize: "14px",
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<CodeIcon />}
          onClick={handleBeautify}
        >
          {"Beautify"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default JSONEditor;
