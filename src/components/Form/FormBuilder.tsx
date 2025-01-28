import * as React from "react";
import { Grid } from "@mui/material";

import Alert from "../Alert/alert";

interface PropsType {
  deferredValue: string;
}

function FormBuilder({ deferredValue }: PropsType) {
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      JSON.parse(deferredValue);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong, that's all we know");
      }
    }
  }, [deferredValue]);
  return (
    <Grid item xs={12} md={6}>
      {error ? <Alert message={error} /> : deferredValue}
    </Grid>
  );
}

export default FormBuilder;
