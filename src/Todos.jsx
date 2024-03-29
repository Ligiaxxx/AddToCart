import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import imgProdus1 from "./media/cozonac.jpg";
import suc from "./media/suc.jpg";
import "./style/Todos.css";

function Todos() {
  const [cart, setCart] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [Menu, setMenu] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchTasks("http://localhost:3000/products")
      .then((data) => {
        setMenu(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  async function fetchTasks(url) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  const ListaProduse = [
    {
      id: 1,
      name: "Cozonac artizanal",
      price: 10.99,
      img: "./media/cozonac.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Suc mere verzi",
      price: 10.99,
      img: "./media/suc.jpg",
      quantity: 1,
    },
    {
      id: 3,
      name: "Suc mere verzi233",
      price: 10.99,
      img: "./media/suc.jpg",
      quantity: 1,
    },
  ];

  async function addProduct(e) {
    e.preventDefault();
    const selectedId = parseInt(e.target.dataset.id);
    // const existingCartItem = cart.find((item) => item.id === selectedId);
  
    try {
      // Verificăm dacă produsul există în baza de date
      const response = await fetch(
        `http://localhost:3000/products/${selectedId}`
      );
  
      if (!response.ok) {
        // Produsul nu există, adăugăm unul nou în baza de date
        const selectedDish = ListaProduse.find((dish) => dish.id === selectedId);
        
        // const selectedDish = await fetch(
        //   `http://localhost:3000/products/${selectedId}`
        // ).then((response) => response.json());

        const newItem = {
          name: selectedDish.name,
          id: selectedDish.id,
          price: selectedDish.price,
          img: selectedDish.img,
          quantity: 1,
        };
  
        const addProductResponse = await fetch(
          "http://localhost:3000/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          }
        );
  
        if (addProductResponse.ok) {
          console.log("Product added successfully to database!");
          setCart([...cart, newItem]);
          setAddedToCart(true);
        } else {
          console.error(
            "Failed to add product to database:",
            addProductResponse.status,
            addProductResponse.statusText
          );
        }
      } else {
        // Produsul există, actualizăm doar cantitatea în coș și în baza de date
        const existingProduct = await response.json();
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
  
        const updateResponse = await fetch(
          `http://localhost:3000/products/${selectedId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        );
  
        if (updateResponse.ok) {
          console.log("Product quantity updated in database!");
          // Actualizăm cantitatea în coș
          const updatedCart = cart.map((item) =>
            item.id === selectedId ? { ...item, quantity: item.quantity + 1 } : item
          );
          setCart(updatedCart);
          setAddedToCart(true);
        } else {
          console.error(
            "Failed to update product quantity:",
            updateResponse.status,
            updateResponse.statusText
          );
        }
      }
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  }
  
  return (
    <div>
      <div className="container">
        <h1>Products</h1>
        <ul>
          <li>
            <div className="product">
              <img
                src={imgProdus1}
                alt="primul-produs"
                className="product-image"
              />

              <p>Cozonac artizanal</p>
              <button data-id={1} onClick={addProduct}>
                Add Product
              </button>
            </div>
          </li>
          <li>
            <div className="product">
              <img src={suc} alt="suc" className="product-image" />

              <p>Suc mere verzi</p>
              <button data-id={2} onClick={addProduct}>
                Add Product
              </button>
            </div>
          </li>
          <li>
            <div className="product">
              <img src={suc} alt="suc2" className="product-image" />

              <p>Suc mere verzi233</p>
              <button data-id={3} onClick={addProduct}>
                Add Product
              </button>
            </div>
          </li>
        </ul>
      </div>
      <Cart cart={cart} />
    </div>
  );
}

export default Todos;
