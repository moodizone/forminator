import * as React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { Controller, useForm } from "react-hook-form";
import { Form, InputType } from "../../type";
import { FormData } from "../../validation";

interface PropsType {
  form: Form;
  initialValues: FormData;
  validationSchema: Yup.ObjectSchema<FormData>;
}

function FormBuilder({ form, validationSchema, initialValues }: PropsType) {
  //================================
  // Init
  //================================
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    // since this is dynamic form and this line only executed at mount phase
    // I have to comment it
    // defaultValues: initialValues,
  });
  const hasName = "name" in form;
  const hasElement = form.elements && Object.keys(form.elements).length > 0;

  //================================
  // Handlers
  //================================
  function onSubmit(value: FormData) {
    console.log(111, value);
  }

  // reset form upon changing the URL leads to change initial values
  React.useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  //================================
  // Render
  //================================
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
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {form.elements?.map((element) => (
            <Controller
              key={element.id}
              name={element.id}
              control={control}
              render={({ field }) => {
                const safeValue = field.value ?? initialValues[field.name];

                return (
                  <>
                    {element.type === InputType.text && (
                      <TextField
                        {...field}
                        value={safeValue}
                        margin="normal"
                        variant="outlined"
                        label={element.label}
                        fullWidth
                        required={element.isRequired}
                        error={!!errors[element["id"]]}
                        helperText={errors[element.id]?.message as string}
                      />
                    )}
                    {element.type === InputType.checkbox && (
                      <FormGroup>
                        <Typography variant="subtitle1" gutterBottom>
                          {element.label}
                        </Typography>
                        {element.choices?.map((choice) => {
                          const isChecked = (safeValue as string[]).includes(
                            choice.id
                          );

                          return (
                            <FormControlLabel
                              key={choice.id}
                              control={
                                <Checkbox
                                  {...field}
                                  value={choice.id}
                                  checked={isChecked}
                                  onChange={() => {
                                    const newValue = isChecked
                                      ? (safeValue as string[]).filter(
                                          (val: string) => val !== choice.id
                                        )
                                      : [...safeValue, choice.id];
                                    field.onChange(newValue);
                                  }}
                                />
                              }
                              label={choice.name}
                            />
                          );
                        })}
                        {errors[element.id] && (
                          <Typography variant="body2" color="error">
                            {errors[element.id]?.message as string}
                          </Typography>
                        )}
                      </FormGroup>
                    )}
                  </>
                );
              }}
            />
          ))}

          {hasElement ? (
            <>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                {"Submit"}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                type="button"
                onClick={() => {
                  reset(initialValues);
                }}
              >
                {"Reset"}
              </Button>
            </>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}

export default FormBuilder;
