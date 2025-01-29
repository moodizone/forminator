import { InputType } from "../type";
import { useFormSlice } from "./form";

describe("useFormSlice store", () => {
  it("should initialize with the correct state", () => {
    const { forms } = useFormSlice.getState();
    expect(forms).toEqual([
      {
        id: "login",
        name: "Login Form",
        elements: [
          {
            id: "username",
            type: InputType.text,
            label: "Username",
            isRequired: true,
          },
          {
            id: "password",
            type: InputType.text,
            label: "Password",
            isRequired: true,
          },
          {
            id: "remember-me",
            type: InputType.checkbox,
            label: "",
            choices: [{ id: "remember", name: "Remember me" }],
          },
        ],
      },
      {
        id: "register",
        name: "Register Form",
        elements: [
          {
            id: "username",
            type: InputType.text,
            label: "Username",
            isRequired: true,
          },
          {
            id: "password",
            type: InputType.text,
            label: "Password",
            isRequired: true,
          },
          {
            id: "confirm-password",
            type: InputType.text,
            label: "Confirm Password",
            isRequired: true,
          },
          {
            id: "consent",
            type: InputType.checkbox,
            label: "I consent to the user agreement including",
            choices: [
              { id: "terms", name: "Terms of services" },
              { id: "policies", name: "Privacy and Policies" },
            ],
          },
        ],
      },
    ]);
  });

  it("should add a new form", () => {
    const newForm = {
      id: "contact",
      name: "Contact Form",
      elements: [
        {
          id: "email",
          type: InputType.text,
          label: "Email",
          isRequired: true,
        },
      ],
    };

    // Add the new form
    useFormSlice.getState().addForm(newForm);

    const { forms } = useFormSlice.getState();
    expect(forms).toContainEqual(newForm);
  });

  it("should update a form", () => {
    const updatedForm = {
      name: "Updated Login Form",
      elements: [
        {
          id: "username",
          type: InputType.text,
          label: "Username",
          isRequired: false,
        },
      ],
    };

    // Update the login form
    useFormSlice.getState().updateForm("login", updatedForm);

    const { forms } = useFormSlice.getState();
    const loginForm = forms.find((form) => form.id === "login");
    expect(loginForm?.name).toBe(updatedForm.name);
    expect(loginForm?.elements[0].isRequired).toBe(false);
  });

  it("should delete a form", () => {
    // Delete the "register" form
    useFormSlice.getState().deleteForm("register");

    const { forms } = useFormSlice.getState();
    expect(forms).not.toContainEqual(
      expect.objectContaining({ id: "register" })
    );
  });

  it("should reset the state to initial state", () => {
    const newForm = {
      id: "contact",
      name: "Contact Form",
      elements: [
        {
          id: "email",
          type: InputType.text,
          label: "Email",
          isRequired: true,
        },
      ],
    };

    // Add the new form and reset the state
    useFormSlice.getState().addForm(newForm);
    useFormSlice.getState().resetSlice();

    const { forms } = useFormSlice.getState();
    expect(forms).toEqual([
      {
        id: "login",
        name: "Login Form",
        elements: [
          {
            id: "username",
            type: InputType.text,
            label: "Username",
            isRequired: true,
          },
          {
            id: "password",
            type: InputType.text,
            label: "Password",
            isRequired: true,
          },
          {
            id: "remember-me",
            type: InputType.checkbox,
            label: "",
            choices: [{ id: "remember", name: "Remember me" }],
          },
        ],
      },
      {
        id: "register",
        name: "Register Form",
        elements: [
          {
            id: "username",
            type: InputType.text,
            label: "Username",
            isRequired: true,
          },
          {
            id: "password",
            type: InputType.text,
            label: "Password",
            isRequired: true,
          },
          {
            id: "confirm-password",
            type: InputType.text,
            label: "Confirm Password",
            isRequired: true,
          },
          {
            id: "consent",
            type: InputType.checkbox,
            label: "I consent to the user agreement including",
            choices: [
              { id: "terms", name: "Terms of services" },
              { id: "policies", name: "Privacy and Policies" },
            ],
          },
        ],
      },
    ]);
  });

  it("should get a form by id", () => {
    const form = useFormSlice.getState().getForm("login");
    expect(form?.id).toBe("login");
    expect(form?.name).toBe("Login Form");
  });

  it("should return undefined if form is not found", () => {
    const form = useFormSlice.getState().getForm("nonexistent");
    expect(form).toBeUndefined();
  });
});
