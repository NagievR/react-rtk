import React, { useEffect } from "react";
import s from "./options.module.scss";
import { useDispatch } from "react-redux";
import { filterByTitle } from "../../../redux/slices/proudctsSlice";
import { Link } from "react-router-dom";

import Input from "../../elements/Input/Input";
import Button from "../../elements/Button/Button";

export default function Options() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterByTitle(""));
  }, [dispatch]);

  const filter = (event) => {
    const searchFor = event.target.value;
    dispatch(filterByTitle(searchFor));
  };

  return (
    <div className={s.optionsWrap}>
      <Input placeholder="Filter by name" callback={filter} width={150} />
      <Link to="/create">
        <div className={s.btn}>
          <Button text="Create" width={100} />
        </div>
      </Link>
    </div>
  );
}
