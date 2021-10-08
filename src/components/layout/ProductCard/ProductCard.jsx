import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/slices/cartSlice";
import { deleteProduct } from "../../../redux/slices/proudctsSlice";
import Button from "../../elements/Button/Button";
import s from "./productCard.module.scss";

export default function ProductCard({ inCart, description, title, price, id }) {
  const dispatch = useDispatch();

  const addProduct = () => {
    dispatch(
      addToCart({
        description,
        quantity: 1,
        title,
        price,
        id,
      })
    );
  };

  return (
    <>
      <section className={s.wrap}>
        <div className={s.title}>{title}</div>
        <div className={s.price}>{price}$</div>

        <Button text="Add to cart" disabled={inCart} action={addProduct} />
        <div className={s.doubleBtnWrap}>
          <div className={s.leftBtn}>
            <Button text="Delete" action={() => dispatch(deleteProduct(id))} />
          </div>
          <Link
            style={{ width: "100%" }}
            className={s.link}
            to={{
              pathname: `edit/${id}`,
              state: { description, title, price, id },
            }}
          >
            <Button text="Edit" />
          </Link>
        </div>

        <div className={s.descr}>{description}</div>
      </section>
    </>
  );
}
