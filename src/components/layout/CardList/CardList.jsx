import React from "react";
import s from "./cardList.module.scss";

import ProductCard from "../ProductCard/ProductCard";

export default function CardList({
  list,
  error,
  isListLoading,
  isCartLoading,
  isCart,
}) {
  if (isListLoading && !isCartLoading) {
    return <div className={s.loading} />;
  }

  if (error) {
    return <div>{error} ( ´•︵•` )</div>;
  }

  if (!list.length) {
    return <div>Nothing found ¯\_(ツ)_/¯</div>;
  }

  return (
    <ul className={s.list}>
      {list.map((product) => (
        <li className={s.item} key={product.id}>
          <ProductCard {...product} isCart={isCart} />
        </li>
      ))}
    </ul>
  );
}
