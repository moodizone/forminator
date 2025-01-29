import * as React from "react";
import { FormData } from "../../validation";
import { TextField } from "@mui/material";

interface PropsType {
  values: FormData;
}

function FormBoard({ values }: PropsType) {
  return (
    <TextField
      label="JSON Schema"
      multiline
      rows={20}
      fullWidth
      variant="outlined"
      value={JSON.stringify(values, null, 2)}
      slotProps={{ input: { readOnly: true } }}
      sx={{
        "& .MuiInputBase-root": {
          fontFamily: "monospace",
          fontSize: "14px",
        },
      }}
    />
  );
}

export default FormBoard;
