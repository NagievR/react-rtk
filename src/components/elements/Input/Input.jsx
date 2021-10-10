import React, { useState } from "react";
import s from "./input.module.scss";

const shouldComponentUpdate = (prevProps, nextProps) => {
  for (let key in prevProps) {
    if (
      typeof prevProps[key] === "function" ||
      typeof nextProps[key] === "function"
    ) {
      continue;
    } else if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }
  return true;
};

const Input = React.memo(
  ({
    type,
    name,
    label,
    width,
    callback,
    inputError,
    placeholder,
    externalValue,
    externalChangeHandler,
  }) => {
    const [localValue, setLocalValue] = useState("");
    const hasExternalHandler = !!externalChangeHandler;

    const handleChange = (event) => {
      if (hasExternalHandler) {
        externalChangeHandler(event);
      } else {
        setLocalValue(event.target.value);
      }
      callback && callback(event);
    };

    const getValue = () => {
      if (hasExternalHandler) {
        return externalValue || "";
      } else {
        return localValue;
      }
    };

    const getCustomStyles = () => {
      return { width: width ? `${width}px` : "" };
    };

    const getType = () => {
      const availableTypes = ["text", "number"];

      if (availableTypes.includes(type)) {
        return type;
      } else if (type) {
        console.warn(`type "${type}" is not provided. you can add it yourself`);
      }
      return availableTypes[0];
    };

    return (
      <div className={s.wrap} style={getCustomStyles()}>
        {label && <div className={s.label}>{label}</div>}
        <input
          className={`${s.input} ${inputError ? s.inputError : ""}`}
          name={name || ""}
          value={getValue()}
          type={getType()}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
        />
        {inputError && <div className={s.error}>{inputError}</div>}
      </div>
    );
  },

  shouldComponentUpdate
);

export default Input;
