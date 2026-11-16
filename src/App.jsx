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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleAddProduct() {
    setIsModalOpen(true)
  }

  function handleSubmitProduct(newProduct) {
    const productWithId = {
      ...newProduct,
      id: Date.now(),
    }

    setProducts((currentProducts) => [
      ...currentProducts,
      productWithId,
    ])

    setIsModalOpen(false)
  }

  function handleEdit(product) {
    console.log('Edit produk:', product)
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
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitProduct}
      />
    </div>
  )
}

export default App