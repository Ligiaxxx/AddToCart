import React from 'react';

function ProductItem({ product, deleteProduct }) {
  const deleteProductHandler = async () => {
    try {
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
        const response = await fetch(`http://localhost:3000/products/${product.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          deleteProduct(product.id);
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
      {product ? (
        <>
          <img src={product.image} alt={product.name} />
     
          <h3>{product.name}</h3>
          <p>Quantity: {product.quantity}</p>
          <p>Price: ${product.price}</p>
          <button onClick={deleteProductHandler}>Delete</button>
        </>
      ) : (
        <p>No products in shopping list</p>
      )}
    </div>
  );
}

export default ProductItem;
