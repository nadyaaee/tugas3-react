function Header({ onAddProduct, viewMode, onViewModeChange }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-5 px-6 py-5 sm:flex-row sm:items-center">

        {/* Judul */}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen Produk
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex shrink-0 flex-wrap items-center gap-3">

          {/* Grid dan List */}
          <div className="flex h-11 items-center rounded-xl bg-slate-100 p-1">

            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`flex h-9 items-center justify-center rounded-lg px-5 text-sm font-semibold transition ${
                viewMode === 'grid'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Grid
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`flex h-9 items-center justify-center rounded-lg px-5 text-sm font-semibold transition ${
                viewMode === 'list'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              List
            </button>

          </div>

          {/* Tambah Produk */}
          <button
            type="button"
            onClick={onAddProduct}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
          >
            <span className="text-xl leading-none">+</span>
            Tambah Produk
          </button>

        </div>
      </div>
    </header>
  )
}

export default Header
