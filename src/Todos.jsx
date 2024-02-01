import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import imgProdus1 from "./media/cozonac.jpg";

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
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
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
      img: imgProdus1,
      quantity: 1,
    },
  ];
  async function addProduct(e) {
    e.preventDefault();
  
    const selectedId = parseInt(e.target.dataset.id);
    const selectedDish = ListaProduse.find((dish) => dish.id === selectedId);
    const existingCartItem = cart.find((item) => item.id === selectedId);
  
    if (existingCartItem) {
      const updatedCart = cart.map((item) =>
        item.id === selectedId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      setAddedToCart(true);
      console.log("Item quantity updated in cart!");
  
      try {
        // Verificați dacă produsul există în baza de date
        const response = await fetch(`http://localhost:3000/products/${selectedId}`);
        if (!response.ok) {
          console.error(
            "Failed to fetch product details:",
            response.status,
            response.statusText
          );
          return;
        }
  
        // Actualizați cantitatea produsului în baza de date
        const existingProduct = await response.json();
        const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + 1 };
  
        const updateResponse = await fetch(`http://localhost:3000/products/${selectedId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        });
  
        if (updateResponse.ok) {
          console.log("Product quantity updated in database!");
        } else {
          console.error(
            "Failed to update product quantity:",
            updateResponse.status,
            updateResponse.statusText
          );
        }
      } catch (error) {
        console.error("Error updating product quantity:", error);
      }
    } else {
      // Adăugați noul produs în coș și în baza de date
      const newItem = {
        name: selectedDish.name,
        id: selectedDish.id,
        price: selectedDish.price,
        image: selectedDish.img,
        quantity: 1,
      };
  
      try {
        // Verificați dacă produsul există deja în baza de date
        const response = await fetch(`http://localhost:3000/products/${selectedId}`);
        const existingProduct = await response.json();
  
        if (existingProduct) {
          // Actualizați cantitatea produsului în baza de date
          const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + 1 };
          const updateResponse = await fetch(`http://localhost:3000/products/${selectedId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          });
  
          if (updateResponse.ok) {
            console.log("Product quantity updated in database!");
          } else {
            console.error(
              "Failed to update product quantity:",
              updateResponse.status,
              updateResponse.statusText
            );
          }
        } else {
          // Adăugați noul produs în baza de date
          const addProductResponse = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          });
  
          if (addProductResponse.ok) {
            console.log("Product added successfully to database!");
          } else {
            console.error(
              "Failed to add product to database:",
              addProductResponse.status,
              addProductResponse.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error adding/updating product:", error);
      }
  
      // Adăugați noul produs în coș
      setCart([...cart, newItem]);
      setAddedToCart(true);
      console.log("Item added to cart!");
    }
  }

  return (
    <div>
      <h1>Todos</h1>

      <img src={imgProdus1} alt="primul-produs" />
      <p>Cozonac artizanal</p>
      <button data-id={1} onClick={addProduct}>
        Add Product
      </button>

      <br />
      {/* Restul codului (input și button pentru adăugare task) */}

      <Cart cart={cart} />
    </div>
  );
}

export default Todos;