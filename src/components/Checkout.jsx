import React from "react";
import { useLocation } from "react-router-dom";
import "../style/Checkout.css";

function Checkout() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const total = searchParams.get("total") || 0;

  return (
    <div>
      <h1>CHECKOUT</h1>
      <p>Total: {total}</p>
    </div>
  );
}

export default Checkout;
