import React, { useCallback, useEffect } from "react";
import s from "./productForm.module.scss";
import validateProductForm from "./validateProductForm";
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
import useForm from "../../../hooks/useForm";
import { getObjectLength } from "../../../utils/getObjectLength";

export default function ProductForm({ productToUpdate, isProductEditing }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, error, resultAfterAsync } = useSelector(
    (state) => state.products
  );
  const { clearForm, handleChange, handleSubmit, values, errors } = useForm(
    handleSaving,
    validateProductForm,
    defineInitialForm()
  );

  const returnHome = useCallback(() => history.push("/"), [history]);

  useEffect(() => {
    if (resultAfterAsync?.id) {
      alert("Success");
      returnHome();
      dispatch(clearResultAfterAsync());
      clearForm();
    }
  }, [resultAfterAsync, dispatch, clearForm, returnHome]);

  useEffect(() => {
    if (isProductEditing && !productToUpdate) {
      returnHome();
    }
  }, [productToUpdate, isProductEditing, returnHome]);

  function defineInitialForm() {
    if (!productToUpdate) {
      return {};
    }
    return {
      title: productToUpdate.title,
      price: productToUpdate.price,
      description: productToUpdate.description,
    };
  }

  function handleSaving() {
    if (productToUpdate) {
      dispatch(updateProduct({ id: productToUpdate.id, dataToUpdate: values }));
    } else {
      dispatch(createProduct(values));
    }
  }

  if (error) {
    alert(error);
    returnHome();
    return null;
  }

  return (
    <section>
      <div className={s.elem}>
        <Input
          externalChangeHandler={handleChange}
          externalValue={values.title}
          inputError={errors.title}
          name="title"
        />
      </div>
      <div className={s.elem}>
        <Input
          externalChangeHandler={handleChange}
          externalValue={values.price}
          inputError={errors.price}
          name="price"
          type="number"
        />
      </div>
      <div className={s.elem}>
        <Input
          externalChangeHandler={handleChange}
          externalValue={values.description}
          inputError={errors.description}
          name="description"
        />
      </div>
      <Button
        disabled={isLoading || getObjectLength(errors)}
        preloader={isLoading}
        text="Save"
        width={100}
        callback={handleSubmit}
      />
    </section>
  );
}
