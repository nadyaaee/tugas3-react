import { useEffect, useState } from 'react'
import Input from '../atoms/Input'
import Textarea from '../atoms/Textarea'

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  image: '',
}

function ProductModal({ isOpen, onClose, onSubmit, editingProduct }) {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        description: editingProduct.description || '',
        price: editingProduct.price || '',
        image: editingProduct.image || '',
      })
    } else {
      setFormData(EMPTY_FORM)
    }
  }, [editingProduct, isOpen])

  useEffect(() => {
    setImageError(false)
  }, [formData.image])

  // Escape untuk menutup modal dan mengunci scroll halaman
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
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

  const priceNumber = Number(formData.price)
  const hasImage = formData.image.trim() !== ''

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm transition-opacity motion-reduce:transition-none max-sm:items-end max-sm:p-0"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[calc(100vh-48px)] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl motion-reduce:transition-none max-sm:max-h-[92vh] max-sm:rounded-b-none"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5">
          <div>
            <h2
              id="pm-title"
              className="text-lg font-bold leading-snug text-slate-900"
            >
              {editingProduct ? 'Edit produk' : 'Tambah produk'}
            </h2>

            <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
              Isi informasi produk di bawah ini.
            </p>
          </div>

          <button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-2xl leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-purple-500"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          {/* Body */}
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
            <Input
              label="Nama produk"
              name="name"
              placeholder="Masukkan nama produk"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Textarea
              label="Deskripsi"
              name="description"
              placeholder="Masukkan deskripsi produk"
              value={formData.description}
              onChange={handleChange}
              required
            />

            {/* Harga */}
            <div>
              <Input
                label="Harga (Rp)"
                type="number"
                name="price"
                placeholder="Masukkan harga produk"
                min="1"
                value={formData.price}
                onChange={handleChange}
                required
              />

              {priceNumber > 0 && (
                <p className="mt-1.5 text-[13px] font-bold text-purple-600">
                  Rp {priceNumber.toLocaleString('id-ID')}
                </p>
              )}
            </div>

            {/* URL Gambar */}
            <div>
              <Input
                label="URL gambar"
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
                required
              />

              {/* Preview Gambar */}
              {hasImage && (
                <div className="mt-2.5 flex h-[170px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  {imageError ? (
                    <p className="px-4 text-center text-[13px] leading-relaxed text-slate-500">
                      Gambar tidak bisa dimuat. Periksa kembali URL-nya.
                    </p>
                  ) : (
                    <img
                      src={formData.image}
                      alt="Pratinjau produk"
                      onError={() => setImageError(true)}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-2 border-t border-slate-100 px-5 pb-5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-slate-100 px-4 py-3 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
            >
              Batal
            </button>

            <button
              type="submit"
              className="flex-1 rounded-lg bg-purple-600 px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
            >
              {editingProduct ? 'Simpan perubahan' : 'Tambah produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal
