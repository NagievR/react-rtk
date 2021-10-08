import React from "react";
import s from "./button.module.scss";

export default function Button({
  text,
  action,
  disabled,
  preloader,
  width = "",
}) {
  const callAction = () => {
    if (!disabled && !preloader && action) {
      action();
    }
  };

  return (
    <button
      className={`${s.btn} ${disabled ? s.disabled : ""}`}
      onClick={callAction}
      style={{ width: width ?? `${width}px` }}
    >
      {(preloader && <div className="preloader" />) || text}
    </button>
  );
}
