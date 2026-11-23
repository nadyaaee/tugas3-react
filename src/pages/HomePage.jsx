import { useEffect, useState } from 'react'
import '../App.css'

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
      header={<Header onAddProduct={handleAddProduct} />}
    >
      <div className="section-heading">
        <div>
          <h2>Daftar Produk</h2>
          <p>Temukan dan kelola produk yang tersedia.</p>
        </div>

        <span className="product-count">
          {filteredProducts.length} Produk
        </span>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {loading && <p>Memuat data produk...</p>}

      {error && (
        <div>
          <p>{error}</p>
          <button onClick={fetchProducts}>Coba Lagi</button>
        </div>
      )}

      {!loading && !error && (
        <ProductList
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {!loading && !error && products.length === 0 && (
        <p>Belum ada produk. Silakan tambahkan produk baru.</p>
      )}

      {!loading && !error && products.length > 0 &&
        filteredProducts.length === 0 && (
          <p>Produk tidak ditemukan.</p>
        )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        editingProduct={editingProduct}
      />

      <DeleteModal
        isOpen={Boolean(deletingProduct)}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
      />
    </MainLayout>
  )
}

export default HomePage
