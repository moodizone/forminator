import { create } from "zustand";
import { Form } from "../../type";

interface FormState {
  forms: Form[];
  addForm(form: Form): void;
  updateForm(id: string, updatedForm: Partial<Form>): void;
  deleteForm(id: string): void;
  resetSlice(): void;
}

const initialState: Form[] = [];
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
