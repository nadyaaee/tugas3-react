import { useEffect, useState } from 'react'
import './ProductModal.css'

function ProductModal({ isOpen, onClose, onSubmit, editingProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  })

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        image: editingProduct.image,
      })
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
      })
    }
  }, [editingProduct, isOpen])

  if (!isOpen) {
    return null
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    onSubmit({
      ...formData,
      price: Number(formData.price),
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>{editingProduct ? 'Edit Produk' : 'Tambah Produk'}</h2>
            <p>
              {editingProduct
                ? 'Perbarui informasi produk.'
                : 'Masukkan informasi produk baru.'}
            </p>
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
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Deskripsi</label>
            <textarea
              name="description"
              placeholder="Masukkan deskripsi produk"
              value={formData.description}
              onChange={handleChange}
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
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>URL Gambar</label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
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
              {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal