import React from "react";
import s from "./button.module.scss";

export default function Button({
  text,
  callback,
  disabled,
  preloader,
  width = "",
}) {
  const callCallback = () => {
    if (!disabled && !preloader && callback) {
      callback();
    }
  };
  return (
    <button
      className={`${s.btn} ${disabled ? s.disabled : ""}`}
      onClick={callCallback}
      style={{ width: width ?? `${width}px` }}
    >
      {(preloader && <div className="preloader" />) || text}
    </button>
  );
}
