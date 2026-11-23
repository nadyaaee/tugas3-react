import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.08),transparent_55%)] px-6 py-10">
      <div className="w-full max-w-[460px] text-center">
        {/* Kode 404 */}
        <p
          aria-hidden="true"
          className="select-none bg-gradient-to-br from-purple-600 to-violet-800 bg-clip-text text-[clamp(96px,22vw,150px)] font-extrabold leading-none tracking-[-0.04em] text-transparent"
        >
          404
        </p>

        {/* Judul */}
        <h1 className="mt-5 text-2xl font-bold leading-tight text-slate-900 sm:text-[26px]">
          Halaman tidak ditemukan
        </h1>

        {/* Deskripsi */}
        <p className="mx-auto mt-3 max-w-[38ch] text-[15px] leading-relaxed text-slate-500">
          Maaf, halaman yang kamu cari tidak tersedia.
        </p>

        {/* Tombol Kembali */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white no-underline transition hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 max-[420px]:w-full"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
