import React from 'react'
import './ProductCard.css'

function ProductCard({product, isHighlighted}) {
  return (
    <div className={`product-card ${isHighlighted ? "highlighted" : ""}`}>
        <div className="card-category">
            {product.category}
        </div>
        <h3 className='card-name'>{product.name}</h3>
        <p className="card-desc">{product.description}</p>
        <div className="card-tags">
            {product.tags.map((tag)=>(
                <span key={tag} className='tag'>
                   {tag}
                </span>
            ))}
        </div>

        <div className="card-footer">
            <span className="card-price">
                ₹{product.price.toLocaleString()}
            </span>
        </div>
    </div>
  )
}

export default ProductCard