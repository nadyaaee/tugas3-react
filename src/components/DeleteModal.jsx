import './DeleteModal.css'

function DeleteModal({ isOpen, product, onClose, onConfirm }) {
  if (!isOpen || !product) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="delete-modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="delete-icon">!</div>

        <h2>Hapus Produk?</h2>

        <p>
          Apakah kamu yakin ingin menghapus produk
          <strong> {product.name}</strong>?
          Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={onClose}
          >
            Batal
          </button>

          <button
            type="button"
            className="btn-delete-confirm"
            onClick={onConfirm}
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
