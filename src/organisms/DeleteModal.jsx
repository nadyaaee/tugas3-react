function DeleteModal({ isOpen, onClose, onConfirm, product }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="!flex !h-auto !min-h-0 !w-full !max-w-[480px] !flex-col !items-center !justify-center !rounded-2xl !border-0 !bg-white !px-8 !py-10 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Icon */}
        <div className="!flex !h-20 !w-20 !shrink-0 !items-center !justify-center !rounded-full !bg-red-50">
          <span className="text-4xl font-bold text-red-600">
            !
          </span>
        </div>

        {/* Title */}
        <h2 className="!mt-6 !mb-0 !text-center !text-2xl !font-bold !text-slate-800">
          Hapus Produk?
        </h2>

        {/* Description */}
        <p className="!mt-3 !mb-0 !w-full !text-center !text-base !leading-7 !text-slate-500">
          Apakah kamu yakin ingin menghapus produk{' '}
          <span className="font-bold text-slate-800">
            {product?.name}
          </span>
          ? Tindakan ini tidak dapat dibatalkan.
        </p>

        {/* Buttons */}
        <div className="!mt-8 !flex !w-full !flex-row !gap-3">
          <button
            type="button"
            onClick={onClose}
            className="!h-12 !flex-1 !rounded-xl !border-0 !bg-slate-100 !px-4 !py-3 !text-base !font-semibold !text-slate-600 hover:!bg-slate-200"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="!h-12 !flex-1 !rounded-xl !border-0 !bg-red-600 !px-4 !py-3 !text-base !font-semibold !text-white hover:!bg-red-700"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
