import { create } from "zustand";
import { Form, InputType } from "../../type";

interface FormState {
  forms: Form[];
  addForm(form: Form): void;
  updateForm(id: string, updatedForm: Partial<Form>): void;
  deleteForm(id: string): void;
  resetSlice(): void;
}

const initialState: Form[] = [
  {
    id: "form1",
    name: "Sample Form",
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
];
export const useFormSlice = create<FormState>((set) => ({
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
}));
