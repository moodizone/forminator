import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";

import { useFormProvider } from "./FormProvider";
import { Form, InputType } from "../../type";

function FormBuilder() {
  const {
    control,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(validationSchema(elements)),
  });
  const { stringifyForm } = useFormProvider();
  const form: Form = React.useMemo(() => {
    return JSON.parse(stringifyForm);
  }, [stringifyForm]);
  const hasName = "name" in form;
  const hasElement = form.elements && Object.keys(form.elements).length > 0;

  if (!hasName && !hasElement) return null;

  return (
    <Card sx={{ maxWidth: 480, margin: "auto", padding: 2 }}>
      <CardContent>
        {hasName ? (
          <>
            <Typography variant="h6" gutterBottom>
              {form.name}
            </Typography>
            <Divider sx={{ marginY: 2 }} />
          </>
        ) : null}
        <form
          id={form.id}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
          // onSubmit={handleSubmit(onSubmit)}
        >
          {form.elements?.map((element) => (
            <Controller
              key={element.id}
              name={element.id}
              control={control}
              render={({ field }) => (
                <>
                  {element.type === InputType.text && (
                    <TextField
                      {...field}
                      margin="normal"
                      variant="outlined"
                      label={element.label}
                      fullWidth
                      required={element.isRequired}
                      error={!!errors[element.id]}
                      // helperText={errors[element.id]?.message}
                    />
                  )}
                  {element.type === InputType.checkbox && (
                    <FormGroup>
                      <Typography variant="subtitle1" gutterBottom>
                        {element.label}
                      </Typography>
                      {element.choices?.map((choice) => (
                        <FormControlLabel
                          key={choice.id}
                          required={element.isRequired}
                          control={<Checkbox {...field} value={choice.id} />}
                          label={choice.name}
                        />
                      ))}
                    </FormGroup>
                  )}
                </>
              )}
            />
          ))}

          {hasElement ? (
            <Button variant="contained" color="primary" fullWidth>
              {"Submit"}
            </Button>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}

export default FormBuilder;
