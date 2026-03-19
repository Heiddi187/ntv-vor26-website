import { useCallback, useRef, useState } from "react";
import type { FormValuesType } from '@/features/types/types';

export function useFormData() {

  const dataRef = useRef<FormValuesType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    selectedFruit: "",
    radioButton: null,
  });

  const [defaultValues, setDefaultValues] = useState<FormValuesType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    selectedFruit: "",
    radioButton: null,
  });

  const onInputChange = useCallback(
    (key: keyof FormValuesType, value: string) => {
      dataRef.current[key] = value;
    },
    []
  );

  const onSubmit = () => {
    const { firstName, email } = dataRef.current;

    localStorage.setItem(email, JSON.stringify(dataRef.current));

    window.alert(`Hello ${firstName}, email address ${email}`);
  };

  const onLoad = useCallback((email: string) => {

    const value = localStorage.getItem(email);

    if (!value) {
      window.alert("Email not found");
      return;
    }

    const parsed = JSON.parse(value);

    setDefaultValues(parsed);

  }, []);

  return {
    dataRef,
    defaultValues,
    onInputChange,
    onSubmit,
    onLoad,
  };
}