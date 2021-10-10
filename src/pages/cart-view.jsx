import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainTitle from "../components/elements/MainTitle/MainTitle";
import CardList from "../components/layout/CardList/CardList";
import { getCart, getTotalSum } from "../redux/slices/cartSlice";

export default function CartView() {
  const { list, isLoading, error, sum } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    (list && list.length) || dispatch(getCart());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotalSum());
  });

  return (
    <div className="container">
      <MainTitle text="Cart view" />
      <CardList
        list={list}
        isListLoading={isLoading}
        error={error}
        isCart={true}
      />
      <div>Total price: {sum}</div>
    </div>
  );
}
