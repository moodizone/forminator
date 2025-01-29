import * as React from "react";

import { Element, Form, InputType } from "../../type";
import { FormData, generateValidationSchema } from "../../validation";
import FormBuilder from "./FormBuilder";

function setInitialValues(elements?: Element[]): FormData {
  if (!elements) return {};

  return elements.reduce<FormData>((acc, element) => {
    if (element.type === InputType.checkbox) {
      acc[element.id] = [];
    } else {
      acc[element.id] = "";
    }
    return acc;
  }, {});
}

interface PropsType {
  stringifyForm: string;
}

function FormProvider({ stringifyForm }: PropsType) {
  const form: Form = React.useMemo(
    () => JSON.parse(stringifyForm),
    [stringifyForm]
  );
  const initialValues = React.useMemo(
    () => setInitialValues(form.elements),
    [form.elements]
  );
  const validationSchema = React.useMemo(
    () => generateValidationSchema(form.elements),
    [form.elements]
  );

  return (
    <FormBuilder
      form={form}
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
}

export default FormProvider;
