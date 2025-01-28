import * as React from "react";
import { TextField } from "@mui/material";

interface PropsType {
  stringifyForm: string;
  setDeferredValue(str: string): void;
}

function JSONEditor({ setDeferredValue, stringifyForm }: PropsType) {
  const [jsonSchema, setJsonSchema] = React.useState<string>("");

  // reflect the outer changes to the internal state
  React.useEffect(() => {
    setJsonSchema(stringifyForm);
  }, [stringifyForm]);

  // improve performance by reducing the number of
  // times the emit logic is called during rapid input changes
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDeferredValue(jsonSchema);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [jsonSchema, setDeferredValue]);

  return (
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
  );
}

export default JSONEditor;
