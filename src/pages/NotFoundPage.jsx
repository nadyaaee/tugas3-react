import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="main-content">
      <h1>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p>Maaf, halaman yang kamu cari tidak tersedia.</p>

      <Link to="/">Kembali ke halaman utama</Link>
    </main>
  )
}

export default NotFoundPage