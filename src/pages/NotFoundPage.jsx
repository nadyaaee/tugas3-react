import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>

        <h2>Halaman Tidak Ditemukan</h2>

        <p>
          Maaf, halaman yang kamu cari tidak tersedia.
        </p>

        <Link to="/" className="not-found-button">
          Kembali ke halaman utama
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage