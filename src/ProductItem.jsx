import React from 'react';
import imgProdus1 from "./media/cozonac.jpg";

function ProductItem({ product, deleteProduct }) {
  const deleteProductHandler = async () => {
  try {
    // Verifică dacă cantitatea este mai mare decât 1 pentru a scădea
    if (product.quantity > 1) {
      const response = await fetch(`http://localhost:3000/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: product.quantity - 1 }),
      });

      if (response.ok) {
        console.log('Product quantity updated successfully in db.json!');
      } else {
        console.error(
          'Failed to update product quantity:',
          response.status,
          response.statusText
        );
      }
    } else {
      // Cantitatea este 1, așa că șterge produsul complet
      const response = await fetch(`http://localhost:3000/products/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        deleteProduct(product.id); // șterge produsul din lista locală
        console.log('Product deleted successfully from db.json!');
      } else {
        console.error('Failed to delete product:', response.status, response.statusText);
      }
    }
  } catch (error) {
    console.error('Error updating/deleting product:', error);
  }
};


  return (
    <div>
      <img src={imgProdus1} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Quantity: {product.quantity}</p>
      <button onClick={deleteProductHandler}>Delete</button>
    </div>
  );
}

export default ProductItem;
