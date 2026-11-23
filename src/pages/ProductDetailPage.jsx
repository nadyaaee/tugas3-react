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
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Produk tidak ditemukan')
        }

        setProduct(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // Tampilan Loading
  if (loading) {
    return (
      <div
        className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-6"
        role="status"
      >
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-purple-200 border-t-purple-600 motion-reduce:animate-none" />

        <p className="mt-4 text-sm text-slate-500">
          Memuat produk...
        </p>
      </div>
    )
  }

  // Tampilan Error
  if (error || !product) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 px-6 py-10 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <svg
            className="h-10 w-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v4m0 4h.01M10.3 3.9 2.8 17.5A2 2 0 0 0 4.5 20.5h15a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          Produk tidak ditemukan
        </h2>

        <p className="mt-2 max-w-md text-[15px] text-slate-500">
          {error || 'Produk yang kamu cari tidak tersedia.'}
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
        >
          Kembali ke daftar produk
        </Link>
      </div>
    )
  }

  // Tampilan Detail Produk
  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[960px]">
        {/* Tombol Kembali */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-purple-700 no-underline transition hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m15 19-7-7 7-7"
            />
          </svg>

          Kembali ke daftar produk
        </Link>

        {/* Card Detail Produk */}
        <article className="mt-4 grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
          {/* Gambar Produk */}
          <div className="min-h-0 bg-slate-100 md:min-h-[380px]">
            <img
              src={product.image}
              alt={product.name}
              className="h-[260px] w-full object-cover md:h-full"
            />
          </div>

          {/* Informasi Produk */}
          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-3xl">
              {product.name}
            </h1>

            <p className="mt-3 text-2xl font-extrabold tracking-tight text-purple-600 md:text-[28px]">
              Rp {Number(product.price).toLocaleString('id-ID')}
            </p>

            <hr className="my-6 border-0 border-t border-slate-200" />

            <h2 className="mb-2 text-sm font-bold text-slate-900">
              Deskripsi
            </h2>

            {product.description ? (
              <p className="max-w-[60ch] whitespace-pre-line text-[15px] leading-[1.7] text-slate-500">
                {product.description}
              </p>
            ) : (
              <p className="text-[15px] italic text-slate-400">
                Tidak ada deskripsi produk.
              </p>
            )}
          </div>
        </article>
      </div>
    </main>
  )
}

export default ProductDetailPage
