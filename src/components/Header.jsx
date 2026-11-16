import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Manajemen Produk</h1>
          <p>Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>

        <button className="btn-add">
          + Tambah Produk
        </button>
      </div>
    </header>
  )
}

export default Header
