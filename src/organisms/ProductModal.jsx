import { useEffect, useState } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
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

          <Button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Nama Produk"
            name="name"
            placeholder="Masukkan nama produk"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          <Input
            label="Harga"
            type="number"
            name="price"
            placeholder="Masukkan harga produk"
            min="1"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <Input
            label="URL Gambar"
            type="url"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <Button
              className="btn-cancel"
              onClick={onClose}
            >
              Batal
            </Button>

            <Button
              type="submit"
              className="btn-submit"
            >
              {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal
