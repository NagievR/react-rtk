import React, { useState, useEffect } from "react";
import s from "./productForm.module.scss";
import {
  createProduct,
  updateProduct,
  clearResultAfterAsync,
} from "../../../redux/slices/proudctsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Button from "../../elements/Button/Button";
import Input from "../../elements/Input/Input";

const labels = {
  title: "Title",
  price: "Price",
  description: "Description",
};

const initialForm = {
  title: "",
  price: 0,
  description: "",
  inCart: false,
};

export default function ProductForm({
  description,
  title,
  price,
  isUpdating,
  id,
}) {
  // const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState(initialForm);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, error, resultAfterAsync } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (resultAfterAsync?.id) {
      alert("Success");
      returnHome();
      dispatch(clearResultAfterAsync());
    }
  }, [resultAfterAsync]);

  // useEffect(() => {
  //   console.log(form)
  //   if (form.title && form.description && form.price) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [form]);

  const handleValue = (event) => {
    const targ = event.target;
    switch (targ.name) {
      case labels.title:
        setForm({ ...form, title: targ.value });
        break;
      case labels.price:
        setForm({ ...form, price: parseInt(targ.value) });
        break;
      case labels.description:
        setForm({ ...form, description: targ.value });
        break;
      default:
        console.error("no such case");
    }
  };

  const returnHome = () => history.push("/");

  const handleSaving = () => {
    if (isUpdating) {
      dispatch(updateProduct({ id, dataToUpdate: form }));
    } else {
      dispatch(createProduct(form));
    }
    alert("Success");
    returnHome();
  };

  if (error) {
    alert(error);
    returnHome();
    return null;
  }

  return (
    <section>
      <div className={s.elem}>
        <Input
          value={title}
          label={labels.title}
          action={handleValue}
          required
          minLength={3}
          maxLength={25}
        />
      </div>
      <div className={s.elem}>
        <Input
          value={price}
          label={labels.price}
          action={handleValue}
          required
          number
          positiveNumber
        />
      </div>
      <div className={s.elem}>
        <Input
          value={description}
          label={labels.description}
          action={handleValue}
          required
          minLength={3}
        />
      </div>
      <Button
        disabled={isLoading}
        preloader={isLoading}
        text="Save"
        width={100}
        action={handleSaving}
      />
    </section>
  );
}
