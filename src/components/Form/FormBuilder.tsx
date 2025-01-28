import * as React from "react";
import { Grid } from "@mui/material";

import Alert from "../Alert/Alert";

interface PropsType {
  stringifyForm: string;
}

function FormBuilder({ stringifyForm }: PropsType) {
  const [error, setError] = React.useState<string | null>(null);
  const deferredSchema = React.useDeferredValue(stringifyForm);

  React.useEffect(() => {
    try {
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong, that's all we know!");
      }
    }
  }, [stringifyForm]);
  return (
    <Grid item xs={12} md={6}>
      {error ? <Alert message={error} /> : deferredSchema}
    </Grid>
  );
}

export default FormBuilder;
