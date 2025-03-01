import { create } from "zustand";
import { Form, InputType } from "../type";

interface FormState {
  forms: Form[];
  addForm(form: Form): void;
  updateForm(id: string, updatedForm: Partial<Form>): void;
  deleteForm(id: string): void;
  resetSlice(): void;
  getForm(id?: Form["id"]): Form | undefined;
}

const initialState: Form[] = [
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
];
export const useFormSlice = create<FormState>((set, get) => ({
  forms: initialState,
  addForm(form) {
    return set((state) => ({
      forms: [...state.forms, form],
    }));
  },
  // e.g renaming a form
  updateForm(id, payload) {
    return set((state) => ({
      forms: state.forms.map((form) =>
        form.id === id
          ? {
              elements: payload.elements || form.elements,
              id: payload.id || form.id,
              name: payload.name || form.name,
            }
          : form
      ),
    }));
  },
  deleteForm(id) {
    return set((state) => ({
      forms: state.forms.filter((form) => form.id !== id),
    }));
  },
  resetSlice() {
    return set({ forms: initialState });
  },
  getForm(id) {
    if (!id) {
      return undefined;
    }

    const list = get().forms;
    return list.find((form) => form.id === id);
  },
}));
