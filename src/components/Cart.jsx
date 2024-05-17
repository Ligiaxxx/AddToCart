import React, { useState, useEffect } from "react";
import { Link, useHistory, useNavigate  } from "react-router-dom";

import TodoItem from "./TodoItem";
import ProductItem from "./ProductItem";
import imgProdus1 from "../media/cozonac.jpg";
import "../style/Cart.css";
import Checkout from "./Checkout";

function Cart() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    // fetchTasks();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (total > 0) {
      navigate(`/checkout?total=${total}`);
    }
  }, [total, navigate]);

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

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    products.forEach((product) => {
      // Calculăm prețul total pentru fiecare produs, înmulțind prețul cu cantitatea
      const productTotalPrice = product.price * product.quantity;
      // Adăugăm prețul total al produsului la prețul total general
      totalPrice += productTotalPrice;
    });
    // Setăm totalul calculat în starea componentei
    console.log(totalPrice);
     return totalPrice;

  };

   // Funcția pentru gestionarea apăsării butonului "Go to Checkout"
   const handleCheckout = () => {
    const totalPrice = calculateTotal(); // Calculează totalul
    navigate(`/checkout?total=${totalPrice}`); // Navighează către pagina de checkout
 
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
      <div className="container-cart">
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
              <div className="PRODUCT-ITEM" 
              key={products.id}>
                <ProductItem
                  product={products}
                  fetchProducts={fetchProducts}
                />
              </div>
            ))}
          </ul>
        )}
        <button onClick={() => { handleCheckout()}}>
          <Link
            to={{ pathname: "/checkout", search: `?total=${total}`}}
            className="checkout-btn"
          >
            Go to Checkout
          </Link>
        </button>
      </div>
    </div>
  );
            }
export default Cart;
