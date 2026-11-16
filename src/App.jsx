import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ProductList from './components/ProductList'
import SearchBar from './components/SearchBar'
import ProductModal from './components/ProductModal'
import productsData from './data/products'

function App() {
  const [products, setProducts] = useState(productsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

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

  function handleSubmitProduct(productData) {
    if (editingProduct) {
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...productData }
            : product
        )
      )
    } else {
      const newProduct = {
        ...productData,
        id: Date.now(),
      }

      setProducts((currentProducts) => [
        ...currentProducts,
        newProduct,
      ])
    }

    setIsModalOpen(false)
    setEditingProduct(null)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  function handleDelete(product) {
    console.log('Hapus produk:', product)
  }

  return (
    <div className="app">
      <Header onAddProduct={handleAddProduct} />

      <main className="main-content">
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

        <ProductList
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        editingProduct={editingProduct}
      />
    </div>
  )
}

export default App