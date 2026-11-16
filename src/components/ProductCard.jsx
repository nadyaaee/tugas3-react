import './ProductCard.css'

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span className="product-price">
          Rp {product.price.toLocaleString('id-ID')}
        </span>
      </div>

      <div className="product-actions">
        <button
          className="btn-edit"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>

        <button
          className="btn-delete"
          onClick={() => onDelete(product)}
        >
          Hapus
        </button>
      </div>
    </div>
  )
}

export default ProductCard
