import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import "./nav.scss";
import { useRecoilValue } from "recoil";
import { atomCart } from "../../atoms/cart";
import { useRecoilState } from "recoil";
import { userInfo } from "../../atoms/user";
import { useState } from "react";

const Nav = () => {
  let [user, setUser] = useRecoilState(userInfo);
  const cart = useRecoilValue(atomCart);

  let [toggleFloatingMenu, setToggleFloatingMenu] = useState(false);

  function handleToggle() {
    setToggleFloatingMenu(!toggleFloatingMenu);
    const open = toggleFloatingMenu;

    if (open) {
      document.getElementById("menu").style.display = "flex";
      document.querySelector(".open").classList.add("hide");
      document.querySelector(".close").classList.remove("hide");
    } else {
      document.getElementById("menu").style.display = "none";
      document.querySelector(".open").classList.remove("hide");
      document.querySelector(".close").classList.add("hide");
    }
  }

  return (
    <div id="nav">
      <div className="nav-content">
        <div className="logo">
          <img src="../src/assets/blog_logo.png" alt="" width={"100%"} />
          <span>Pukkawit's Blog</span>
        </div>
        <div className="toggle" onClick={() => handleToggle()}>
          <span className="close hide">&#10006;</span>
          <span className="open">&#9776;</span>
        </div>
        <ul id="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/portfolio">Porfolio</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li style={{ display: user.isLoggedIn ? "none" : "flex" }}>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
        <div className="right">
          <div className="cartDiv">
            <img src="../src/assets/white_shopping-cart.svg" alt="cart-icon" />
            <div className="cartStyle">{cart}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
