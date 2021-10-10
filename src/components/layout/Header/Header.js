import React from "react";
import s from "./header.module.scss";
import { Link } from "react-router-dom";
import cartIcon from "../../../assets/icons/cart.svg";

const Header = () => {
  return (
    <header className={s.container}>
      <div className="container">
        <div className={s.inner}>
          <Link className={s.icon} to="/">
            <div className={s.logo}>logo</div>
          </Link>
          <div className={s.rightBlock}>
            <Link className={s.icon} to="/cart">
              <img src={cartIcon} alt="cart" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
