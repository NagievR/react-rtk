import React from "react";
import s from "./mainTitle.module.scss";

export default function MainTitle({ text }) {
  return <h1 className={s.title}>{text}</h1>;
}
