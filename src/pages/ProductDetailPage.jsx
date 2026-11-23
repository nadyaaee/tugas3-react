import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ProductDetailPage() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `http://localhost:3000/api/products/${id}`
        )

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Produk tidak ditemukan')
          }

          throw new Error('Gagal mengambil detail produk')
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <main className="detail-page">
        <div className="detail-container">
          <p>Memuat detail produk...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="detail-page">
        <div className="detail-container">
          <h1>{error}</h1>
          <p>Produk dengan ID {id} tidak tersedia.</p>

          <Link to="/" className="detail-back-button">
            Kembali ke daftar produk
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="detail-page">
      <div className="detail-container">
        <Link to="/" className="detail-back-link">
          ← Kembali ke daftar produk
        </Link>

        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="detail-image"
          />
        )}

        <h1 className="detail-title">{product.name}</h1>

        <p className="detail-description">
          {product.description || 'Tidak ada deskripsi produk.'}
        </p>

        <p className="detail-price">
          Rp {Number(product.price).toLocaleString('id-ID')}
        </p>
      </div>
    </main>
  )
}

export default ProductDetailPage
