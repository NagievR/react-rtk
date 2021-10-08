import React from "react";
import MainTitle from "../components/elements/MainTitle/MainTitle";
import CardList from "../components/layout/CardList/CardList";
import Options from "../components/layout/Options/Options";
import Pagination from "../components/layout/Pagination/Pagination";

export default function MainView() {
  return (
    <div className="container">
      <MainTitle text="Main view" />
      <Options />
      <CardList />
      <Pagination />
    </div>
  );
}
