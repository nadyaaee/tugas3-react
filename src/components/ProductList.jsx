import ProductCard from './ProductCard'
import './ProductList.css'

function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ProductList