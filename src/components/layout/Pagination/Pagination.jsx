import React from "react";
import s from "./pagination.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changePage } from "../../../redux/slices/proudctsSlice";

export default function Pagination() {
  const { currentPage, totalPages } = useSelector(
    (state) => state.products.pagination
  );
  const dispatch = useDispatch();

  const handlePageChanging = (to) => {
    dispatch(changePage(to));
  };

  const getListItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <li
          key={i}
          className={`${s.item} ${currentPage === i ? s.active : ""}`}
          onClick={() => handlePageChanging(i)}
        >
          {i}
        </li>
      );
    }
    return items;
  };

  return (
    <section>
      <ul className={s.list}>{getListItems()}</ul>
    </section>
  );
}
