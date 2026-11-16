import './ProductModal.css'

function ProductModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) {
    return null
  }

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)

    const newProduct = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      image: formData.get('image'),
    }

    onSubmit(newProduct)
    event.target.reset()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>Tambah Produk</h2>
            <p>Masukkan informasi produk baru.</p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Produk</label>
            <input
              type="text"
              name="name"
              placeholder="Masukkan nama produk"
              required
            />
          </div>

          <div className="form-group">
            <label>Deskripsi</label>
            <textarea
              name="description"
              placeholder="Masukkan deskripsi produk"
              required
            />
          </div>

          <div className="form-group">
            <label>Harga</label>
            <input
              type="number"
              name="price"
              placeholder="Masukkan harga produk"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>URL Gambar</label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Batal
            </button>

            <button type="submit" className="btn-submit">
              Tambah Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal
