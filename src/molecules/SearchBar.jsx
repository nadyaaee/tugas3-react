import './SearchBar.css'

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon">⌕</span>
      <input
        type="text"
        placeholder="Cari nama produk..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar
