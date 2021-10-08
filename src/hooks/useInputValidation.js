import { useState, useEffect } from "react";

const ERRORS = {
  IS_EMPTY: `This field can't be empty. `,
  IS_SHORTER_THAN(min) {
    return `Must be at least ${min} characters (no spaces). `;
  },
  IS_LONGER_THAN(max) {
    return `Must be no more than ${max} characters. `;
  },
};

const defaultOptions = {
  required: false,
  minLength: null,
  maxLength: null,
};

const useValidation = (userOptions) => {
  const [options, setOptions] = useState(defaultOptions);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (userOptions) {
      setOptions((current) => ({ ...current, ...userOptions }));
    }
  }, []);

  const removeErrors = () => setInputError("");

  const checkValidity = (input) => {
    removeErrors();
    const valueTrimmed = String(input).trim();

    if (options.required && !valueTrimmed.length) {
      setInputError((prev) => (prev += ERRORS.IS_EMPTY));
    }
    if (options.maxLength && valueTrimmed.length >= options.maxLength) {
      setInputError(
        (prev) => (prev += ERRORS.IS_LONGER_THAN(options.maxLength))
      );
    }
    if (options.minLength && valueTrimmed.length < options.minLength) {
      setInputError(
        (prev) => (prev += ERRORS.IS_SHORTER_THAN(options.minLength))
      );
    }
  };

  return { inputError, checkValidity, removeErrors };
};

export default useValidation;
