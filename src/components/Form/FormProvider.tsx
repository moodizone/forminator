import * as React from "react";
import { Form } from "../../type";

interface ContextType {
  stringifyForm: string;
  setStringifyForm(str: string): void;
}

interface PropsType {
  form?: Form;
}

const initialState: ContextType = {
  stringifyForm: "{}",
  setStringifyForm: () => void 0,
};

const FormContext = React.createContext<ContextType>(initialState);
FormContext.displayName = "FormProvider";

function FormProvider({ children, form }: React.PropsWithChildren<PropsType>) {
  const [stringifyForm, setStringifyForm] = React.useState<string>(
    initialState.stringifyForm
  );

  // update internal state with prop changes
  React.useEffect(() => {
    setStringifyForm(JSON.stringify(form ?? {}, null, 2));
  }, [form]);

  return (
    <FormContext.Provider value={{ stringifyForm, setStringifyForm }}>
      {children}
    </FormContext.Provider>
  );
}

function useFormProvider() {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("`useFormProvider` must be used within a `<FormProvider/>");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { FormProvider, useFormProvider, FormContext };
