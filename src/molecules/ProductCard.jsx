import { Link } from 'react-router-dom'

function ProductCard({ product, onEdit, onDelete, viewMode }) {
  const isList = viewMode === 'list'

  return (
    <div
      className={`group flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg ${
        isList
          ? 'flex-col sm:flex-row sm:items-stretch sm:hover:translate-y-0'
          : 'flex-col'
      }`}
    >
      <Link
        to={`/products/${product.id}`}
        className={`flex min-w-0 flex-1 flex-col text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 ${
          isList ? 'sm:flex-row' : ''
        }`}
      >
        {/* Gambar Produk */}
        <div
          className={`shrink-0 overflow-hidden bg-slate-100 ${
            isList
              ? 'h-48 w-full sm:h-auto sm:min-h-[150px] sm:w-[190px]'
              : 'h-[190px] w-full'
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Informasi Produk */}
        <div
          className={`flex min-w-0 flex-1 flex-col p-4 ${
            isList ? 'sm:justify-center sm:px-5 sm:py-5' : ''
          }`}
        >
          <h3 className="mb-1.5 line-clamp-2 text-[17px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-purple-700">
            {product.name}
          </h3>

          <p
            className={`line-clamp-2 text-[13px] leading-relaxed text-slate-500 ${
              isList ? 'sm:max-w-[70ch]' : 'min-h-[42px]'
            }`}
          >
            {product.description}
          </p>

          <p
            className={`mt-auto whitespace-nowrap pt-3 text-lg font-extrabold tracking-tight text-purple-600 ${
              isList ? 'sm:mt-2 sm:pt-0' : ''
            }`}
          >
            Rp {Number(product.price).toLocaleString('id-ID')}
          </p>
        </div>
      </Link>

      {/* Tombol Aksi */}
      <div
        className={`flex gap-2 p-4 pt-3 ${
          isList
            ? 'sm:w-[150px] sm:shrink-0 sm:flex-col sm:justify-center sm:pl-0'
            : ''
        }`}
      >
        <Link
          to={`/products/${product.id}`}
          className="flex flex-1 items-center justify-center rounded-lg bg-slate-100 px-3 py-2.5 text-center text-[13px] font-semibold text-slate-600 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
        >
          Detail
        </Link>

        <button
          type="button"
          onClick={() => onEdit(product)}
          className="flex-1 rounded-lg bg-purple-50 px-3 py-2.5 text-[13px] font-semibold text-purple-700 transition hover:bg-purple-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(product)}
          className="flex-1 rounded-lg bg-red-50 px-3 py-2.5 text-[13px] font-semibold text-red-600 transition hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          Hapus
        </button>
      </div>
    </div>
  )
}

export default ProductCard
