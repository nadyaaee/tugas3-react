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
    return <main className="main-content">Memuat detail produk...</main>
  }

  if (error) {
    return (
      <main className="main-content">
        <h2>{error}</h2>
        <Link to="/">Kembali ke daftar produk</Link>
      </main>
    )
  }

  return (
    <main className="main-content">
      <Link to="/">← Kembali ke daftar produk</Link>

      <div className="product-detail">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
          />
        )}

        <div>
          <h1>{product.name}</h1>

          <h2>
            Rp {Number(product.price).toLocaleString('id-ID')}
          </h2>

          <p>
            {product.description || 'Tidak ada deskripsi produk.'}
          </p>

          <p>ID Produk: {product.id}</p>
        </div>
      </div>
    </main>
  )
}

export default ProductDetailPage
