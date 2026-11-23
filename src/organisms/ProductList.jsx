import ProductCard from '../molecules/ProductCard'
import './ProductList.css'

function ProductList({ products, onEdit, onDelete, viewMode }) {
  return (
    <div className={`product-list ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
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
