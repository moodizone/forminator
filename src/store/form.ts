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
    id: "form1",
    name: "Sample Form1",
    elements: [
      {
        id: "checkbox1",
        type: InputType.checkbox,
        label: "Select Options",
        choices: [
          { id: "choice1", name: "Option 1" },
          { id: "choice2", name: "Option 2" },
        ],
      },
      {
        id: "textField1",
        type: InputType.checkbox,
        label: "Enter Text",
        isRequired: true,
      },
    ],
  },
  {
    id: "form2",
    name: "Sample Form2",
    elements: [
      {
        id: "checkbox",
        type: InputType.checkbox,
        label: "Select Options",
        choices: [
          { id: "choice1", name: "Option 1" },
          { id: "choice2", name: "Option 2" },
        ],
      },
      {
        id: "textField1",
        type: InputType.checkbox,
        label: "Enter Text",
        isRequired: true,
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
