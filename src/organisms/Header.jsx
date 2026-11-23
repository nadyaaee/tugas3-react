import './Header.css'

function Header({ onAddProduct, viewMode, onViewModeChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Manajemen Produk</h1>
          <p>Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>

        <div className="header-actions">
          <div className="view-toggle">
            <button
              type="button"
              className={viewMode === 'grid' ? 'view-button active' : 'view-button'}
              onClick={() => onViewModeChange('grid')}
            >
              Grid
            </button>

            <button
              type="button"
              className={viewMode === 'list' ? 'view-button active' : 'view-button'}
              onClick={() => onViewModeChange('list')}
            >
              List
            </button>
          </div>

          <button className="btn-add" onClick={onAddProduct}>
            + Tambah Produk
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header