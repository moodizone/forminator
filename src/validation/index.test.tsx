import * as Yup from "yup";
import { generateValidationSchema } from "../validation";
import { InputType } from "../type";

describe("generateValidationSchema", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let schema: Yup.ObjectSchema<any>;

  beforeEach(() => {
    schema = generateValidationSchema([
      { id: "name", type: InputType.text, isRequired: true, label: "Name" },
      { id: "email", type: InputType.text, isRequired: false, label: "Email" },
      {
        id: "preferences",
        type: InputType.checkbox,
        isRequired: true,
        label: "Preferences",
      },
      {
        id: "newsletter",
        type: InputType.checkbox,
        isRequired: false,
        label: "Newsletter",
      },
    ]);
  });

  //=========================================
  // Text Field Tests
  //=========================================

  test("fails when required text field is empty", async () => {
    await expect(
      schema.validate({ name: "", email: "", preferences: ["option1"] })
    ).rejects.toThrow("Name is required");
  });

  test("passes when required text field has a value", async () => {
    await expect(
      schema.validate({ name: "John Doe", email: "", preferences: ["option1"] })
    ).resolves.toBeTruthy();
  });

  test("passes when optional text field is empty", async () => {
    await expect(
      schema.validate({ name: "John Doe", email: "", preferences: ["option1"] })
    ).resolves.toBeTruthy();
  });

  test("passes when optional text field has a value", async () => {
    await expect(
      schema.validate({
        name: "John Doe",
        email: "john@example.com",
        preferences: ["option1"],
      })
    ).resolves.toBeTruthy();
  });

  //=========================================
  // Checkbox Field Tests
  //=========================================

  test("fails when required checkbox field is empty", async () => {
    await expect(
      schema.validate({ name: "John Doe", preferences: [] })
    ).rejects.toThrow("At least one option must be selected");
  });

  test("passes when required checkbox field has one selection", async () => {
    await expect(
      schema.validate({ name: "John Doe", preferences: ["option1"] })
    ).resolves.toBeTruthy();
  });

  test("passes when required checkbox field has multiple selections", async () => {
    await expect(
      schema.validate({ name: "John Doe", preferences: ["option1", "option2"] })
    ).resolves.toBeTruthy();
  });

  test("passes when optional checkbox field is empty", async () => {
    await expect(
      schema.validate({
        name: "John Doe",
        newsletter: [],
        preferences: ["option2"],
      })
    ).resolves.toBeTruthy();
  });

  test("passes when optional checkbox field has selections", async () => {
    await expect(
      schema.validate({
        name: "John Doe",
        newsletter: ["option1"],
        preferences: ["option2"],
      })
    ).resolves.toBeTruthy();
  });
});
