import * as Yup from "yup";

import { Element, InputType } from "../type";

export type FormData = Record<string, string | string[]>;

export function generateValidationSchema(
  elements: Element[]
): Yup.ObjectSchema<FormData> {
  if (!elements) {
    return Yup.object().shape({});
  }

  const schema: Record<string, Yup.AnySchema> = {};

  elements.forEach((element) => {
    if (element.isRequired) {
      if (element.type === InputType.text) {
        schema[element.id] = Yup.string().required(
          `${element.label} is required`
        );
      } else if (element.type === InputType.checkbox) {
        schema[element.id] = Yup.array()
          .of(Yup.string())
          .required("At least one option must be selected")
          .min(1, `At least one option must be selected`);
      }
    } else {
      if (element.type === InputType.text) {
        schema[element.id] = Yup.string().nullable();
      } else if (element.type === InputType.checkbox) {
        schema[element.id] = Yup.array().of(Yup.string()).nullable();
      }
    }
  });

  return Yup.object().shape(schema) as Yup.ObjectSchema<FormData>;
}
