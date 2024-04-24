import React from "react";
import Todos from "./components/Todos";
import Greet from "./Greet";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Navbar from "./components/Navbar";
import Acasa from "./components/Acasa";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/acasa" element={<Acasa />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
