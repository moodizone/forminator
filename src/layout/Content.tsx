import { Box, Grid } from "@mui/material";
import { useParams } from "react-router";

import FormBuilder from "../components/Form/FormBuilder";
import JSONEditor from "../components/Form/JSONEditor";
import { useFormSlice } from "../store/form";
import { FormContext, FormProvider } from "../components/Form/FormProvider";
import { ErrorBoundary } from "react-error-boundary";
import Alert from "../components/Alert/Alert";

function Content() {
  const { id } = useParams<{ id: string }>();
  const { getForm } = useFormSlice();
  const form = getForm(id);

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
      <FormProvider form={form}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <JSONEditor />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* reset the FormBuilder whenever `stringifyForm` */}
            <FormContext.Consumer>
              {({ stringifyForm }) => {
                return (
                  <ErrorBoundary
                    FallbackComponent={Alert}
                    resetKeys={[stringifyForm]}
                  >
                    <FormBuilder />
                  </ErrorBoundary>
                );
              }}
            </FormContext.Consumer>
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
}

export default Content;
