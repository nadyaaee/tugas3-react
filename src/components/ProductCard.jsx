import { Link } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-detail-link"
      >
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <span className="product-price">
            Rp {Number(product.price).toLocaleString('id-ID')}
          </span>
        </div>
      </Link>

      <div className="product-actions">
        <Link
          to={`/products/${product.id}`}
          className="btn-detail"
        >
          Detail
        </Link>

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