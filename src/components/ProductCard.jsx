// src/components/ProductCard.jsx
import React from 'react';

 function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="card">
      <img src={product.images?.[0]} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <div className="actions">
        <button onClick={() => onEdit(product)}>✏️ Edit</button>
        <button onClick={() => onDelete(product.id)}>🗑 Delete</button>
      </div>
    </div>
  );
}

export default ProductCard
