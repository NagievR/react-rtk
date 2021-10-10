import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  updateCart,
} from "../../../redux/slices/cartSlice";
import { deleteProduct } from "../../../redux/slices/proudctsSlice";
import Button from "../../elements/Button/Button";
import Amount from "../Amount/Amount";
import s from "./productCard.module.scss";

export default function ProductCard ({
  inCart,
  description,
  title,
  price,
  id,
  isCart,
  quantity,
}) {
  const dispatch = useDispatch();
  const isProductsLoading = useSelector((state) => state.products.isLoading);
  const isCartLoading = useSelector((state) => state.cart.isLoading);

  const itemToDispatch = {
    description,
    quantity: 1,
    title,
    price,
    id,
  };

  const addProduct = () => {
    dispatch(addToCart(itemToDispatch));
  };

  const setProductsAmount = (amount) => {
    dispatch(updateCart({ ...itemToDispatch, quantity: amount }));
  };

  return (
    <>
      <section className={s.wrap}>
        <div className={s.title}>{title}</div>
        <div className={s.price}>{price}$</div>

        {!isCart && (
          <>
            <Button
              text="Add to cart"
              disabled={inCart}
              preloader={isCartLoading || isProductsLoading}
              callback={addProduct}
            />
            <div className={s.doubleBtnWrap}>
              <div className={s.leftBtn}>
                <Button
                  text="Delete"
                  preloader={isProductsLoading}
                  callback={() => dispatch(deleteProduct(id))}
                />
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
          </>
        )}
        {isCart && (
          <>
            <Button
              text="Remove from cart"
              preloader={isCartLoading}
              callback={() => dispatch(removeFromCart(itemToDispatch))}
            />
            <Amount
              current={quantity}
              callback={(amount) => setProductsAmount(amount)}
            />
          </>
        )}

        <div className={s.descr}>{description}</div>
      </section>
    </>
  );
}
