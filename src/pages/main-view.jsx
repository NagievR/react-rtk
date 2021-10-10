import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/proudctsSlice";

import MainTitle from "../components/elements/MainTitle/MainTitle";
import CardList from "../components/layout/CardList/CardList";
import Options from "../components/layout/Options/Options";
import Pagination from "../components/layout/Pagination/Pagination";

export default function MainView() {
  const { isCartLoading } = useSelector((state) => state.cart);
  const { paginatedList, isLoading, error } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (paginatedList && paginatedList.length) || dispatch(fetchProducts());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div className="container">
      <MainTitle text="Main view" />
      <Options />
      <CardList
        list={paginatedList}
        isListLoading={isLoading}
        isCartLoading={isCartLoading}
        error={error}
      />
      <Pagination />
    </div>
  );
}
