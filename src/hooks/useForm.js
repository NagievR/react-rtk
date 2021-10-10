import { useEffect, useState } from "react";
import { getObjectLength } from "../utils/getObjectLength";

const useForm = (callback, validate, initialValues) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isSubmitting, seIsSubmitting] = useState(false);

  const valuesNotEmpty = getObjectLength(values);

  useEffect(() => {
    const withoutErrors = !getObjectLength(errors);
    if (withoutErrors && valuesNotEmpty && isSubmitting) {
      callback();
    }
    seIsSubmitting(false);
  }, [isSubmitting, callback, valuesNotEmpty, validate, errors]);

  useEffect(() => {
    if (valuesNotEmpty) {
      setErrors(validate(values));
    }
  }, [values, valuesNotEmpty, validate]);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    seIsSubmitting(true);
    setErrors(validate(values));
  };

  return {
    clearForm: () => setValues({}),
    handleSubmit,
    handleChange,
    values,
    errors,
  };
};

export default useForm;
