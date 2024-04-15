import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import TodoItem from "./TodoItem";
import ProductItem from "./ProductItem";
import imgProdus1 from "./media/cozonac.jpg";
import "./style/Cart.css";
import Checkout from "./Checkout";

function Cart() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    fetchTasks();
    fetchProducts();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();

      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTask }),
      });

      if (response.ok) {
        setNewTask("");
        fetchTasks(); // Refresh the tasks list after adding a new task
      } else {
        console.error(
          "Failed to add task:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const showProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTask }),
      });
      if (response.ok) {
        setNewProduct("");
        fetchTasks(); // Refresh the product list after adding a new product
      } else {
        console.error(
          "Failed to add product:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  async function shop(e) {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();

      console.log("Cumpăr următoarele produse:");
      data.forEach((product, index) => {
        console.log(
          `Produsul ${index + 1}: ${product.name} - Cantitate: ${
            product.quantity
          } - Preț: ${product.price}`
        );
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <div>
      <h1>Cart</h1>
      {/* {tasks.length === 0 ? (
        <p>No tasks in the list</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TodoItem key={task.id} task={task} fetchTasks={fetchTasks} />
          ))}
        </ul>
      )} */}

      {products.length === 0 ? (
        <p>No Products in the list</p>
      ) : (
        <ul>
          {products.map((products) => (
            <ProductItem
              key={products.id}
              product={products}
              fetchProducts={fetchProducts}
            />
          ))}
        </ul>
      )}
   <button><Link to="/checkout" target="_blank">Go to Checkout</Link></button>
    </div>
  );
}

export default Cart;
