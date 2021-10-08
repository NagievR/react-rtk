import React, { useEffect, useState } from "react";
import useValidation from "../../../hooks/useInputValidation";
import s from "./input.module.scss";

export default function Input({
  placeholder,
  action,
  label,
  width,
  required,
  minLength,
  maxLength,
  number,
  positiveNumber,
  value
}) {
  const [inputValue, setInputValue] = useState(value);
  const { inputError, checkValidity, removeErrors } = useValidation({
    required,
    minLength,
    maxLength,
  });

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  const handleChange = (event) => {
    let value = event.target.value;
    
    if (number && positiveNumber) {
      value = Math.abs(value);
    }

    setInputValue(value);

    // if (inputError) {
    //   removeErrors();
    //   return;
    // }

    action(event);
  };

  return (
    <div className={s.wrap} style={{ width: width ?? `${width}px` }}>
      {label && <div className={s.label}>{label}</div>}
      <input
        name={label ?? label}
        value={inputValue}
        className={s.input}
        placeholder={placeholder}
        type={number ? "number" : "text"}
        onChange={handleChange}
        // onBlur={() => checkValidity(inputValue)}
        // onFocus={() => checkValidity(inputValue)}
      />
      {inputError && <div className={s.error}>{inputError}</div>}
    </div>
  );
}
