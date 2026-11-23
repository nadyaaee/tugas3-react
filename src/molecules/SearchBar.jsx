function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:max-w-md">
      {/* Icon Search */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16 16 4 4"
          />
        </svg>
      </div>

      {/* Input Search */}
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari produk..."
        className="h-12 w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
      />

      {/* Clear Search */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-red-500"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default SearchBar
