import * as React from "react";
import { Box, Grid } from "@mui/material";
import { useParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import FormProvider from "../components/Form/FormProvider";
import JSONEditor from "../components/Form/JSONEditor";
import { useFormSlice } from "../store/form";
import Alert from "../components/Alert/Alert";

function Content() {
  const { id } = useParams<{ id: string }>();
  const { getForm } = useFormSlice();
  const [stringifyForm, setStringifyForm] = React.useState<string | null>(null);

  // update based on changing the URL
  React.useEffect(() => {
    const form = getForm(id);
    const newStringify = JSON.stringify(form ? form : {}, null, 2);
    setStringifyForm(newStringify);
  }, [id, getForm]);

  // skip first hydration
  if (typeof stringifyForm !== "string") {
    return null;
  }

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
          <JSONEditor
            stringifyForm={stringifyForm}
            setStringifyForm={setStringifyForm}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ErrorBoundary
            FallbackComponent={Alert}
            // reset the FormProvider whenever `stringifyForm` changes
            resetKeys={[stringifyForm]}
          >
            <FormProvider stringifyForm={stringifyForm} />
          </ErrorBoundary>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Content;
