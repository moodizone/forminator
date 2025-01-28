import * as React from "react";
import { TextField } from "@mui/material";
import { useFormProvider } from "./FormProvider";

function JSONEditor() {
  const { stringifyForm, setStringifyForm } = useFormProvider();
  const [value, setValue] = React.useState<string>("");

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

  return (
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
  );
}

export default JSONEditor;
