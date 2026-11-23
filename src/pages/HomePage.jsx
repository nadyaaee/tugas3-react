import { useEffect, useState } from 'react'

import MainLayout from '../templates/MainLayout'
import Header from '../organisms/Header'
import ProductList from '../organisms/ProductList'
import SearchBar from '../molecules/SearchBar'
import ProductModal from '../organisms/ProductModal'
import DeleteModal from '../organisms/DeleteModal'

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService'

function HomePage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Mengambil data produk dari backend
  async function fetchProducts() {
    try {
      setLoading(true)
      setError('')

      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleAddProduct() {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  function handleEdit(product) {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  // Menambah atau mengedit produk
  async function handleSubmitProduct(productData) {
    try {
      if (editingProduct) {
        const updatedProduct = await updateProduct(
          editingProduct.id,
          productData
        )

        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === editingProduct.id
              ? updatedProduct
              : product
          )
        )
      } else {
        const newProduct = await createProduct(productData)

        setProducts((currentProducts) => [
          ...currentProducts,
          newProduct,
        ])
      }

      setIsModalOpen(false)
      setEditingProduct(null)
    } catch (err) {
      alert(err.message)
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  function handleDelete(product) {
    setDeletingProduct(product)
  }

  // Menghapus produk dari backend
  async function handleConfirmDelete() {
    try {
      await deleteProduct(deletingProduct.id)

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== deletingProduct.id
        )
      )

      setDeletingProduct(null)
    } catch (err) {
      alert(err.message)
    }
  }

  
  
return (
  <MainLayout
    header={
      <Header
        onAddProduct={handleAddProduct}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    }
  >
    <section className="min-h-screen w-full bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-6 py-10">

        {/* Page Heading and Search */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Daftar Produk
            </h2>

            <p className="mt-2 text-base text-slate-500">
              Temukan dan kelola produk yang tersedia.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:max-w-md">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Memuat produk...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h3 className="text-lg font-bold text-red-700">
              Terjadi Kesalahan
            </h3>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Product List */}
        {!loading && !error && filteredProducts.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Menampilkan{' '}
                <span className="font-bold text-slate-800">
                  {filteredProducts.length}
                </span>{' '}
                produk
              </p>
            </div>

            <ProductList
              products={filteredProducts}
              onEdit={handleEdit}
              onDelete={handleDelete}
              viewMode={viewMode}
            />
          </>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-50">
              <svg
                className="h-10 w-10 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  strokeWidth="2"
                />
                <path
                  d="m16 16 4 4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-800">
              Produk Tidak Ditemukan
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              {searchTerm
                ? `Tidak ada produk yang cocok dengan pencarian "${searchTerm}".`
                : 'Belum ada produk yang tersedia.'}
            </p>

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="mt-6 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Reset Pencarian
              </button>
            )}

          </div>
        )}

        {/* Product Modal */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitProduct}
          editingProduct={editingProduct}
        />

        {/* Delete Modal */}
        <DeleteModal
          isOpen={Boolean(deletingProduct)}
          onClose={() => setDeletingProduct(null)}
          onConfirm={handleConfirmDelete}
          product={deletingProduct}
        />

      </div>
    </section>
  </MainLayout>
)

}

export default HomePage
