import React, { useEffect } from "react";
import s from "./cardList.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../redux/slices/proudctsSlice";
import ProductCard from "../ProductCard/ProductCard";

export default function CardList() {
  const { paginatedList, isLoading, error } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <div className={s.loading} />;
  }

  if (error) {
    return <div>{'(っ˘̩╭╮˘̩)っ'} {error}</div>;
  }

  if (!paginatedList.length) {
    return <div>Nothing found ¯\_(ツ)_/¯</div>
  }

  return (
    <ul className={s.list}>
      {paginatedList.map((product) => (
        <li className={s.item} key={product.id}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
}
