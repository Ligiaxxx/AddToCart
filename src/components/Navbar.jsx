import React from "react";
import { Link } from "react-router-dom";
import shopping_cart from "../media/shopping-cart.png";
import "../style/Navbar.css";

function Navbar() {
  return (
    <div className="navigation">
      <nav>
        <ul>
          <li>
            <Link className="link-no-decoration" to="/">
              Produse
            </Link>
          </li>
          <li>
            <Link className="link-no-decoration" to="/Acasa">
              Acasă
            </Link>
          </li>
          <li>
            <Link className="link-no-decoration" to="/Cart">
              Coș
            </Link>
          </li>
          <li>
            <Link className="link-no-decoration" to="/checkout">
              Checkout
            </Link>
          </li>
          <li className="shopping_cart">
            <button>
              <Link to="/Cart" id="link">
                <img src={shopping_cart} alt="Shopping Cart" />
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
