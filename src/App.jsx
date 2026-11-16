import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ProductList from './components/ProductList'
import productsData from './data/products'

function App() {
  const [products] = useState(productsData)

  function handleEdit(product) {
    console.log('Edit produk:', product)
  }

  function handleDelete(product) {
    console.log('Hapus produk:', product)
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="section-heading">
          <div>
            <h2>Daftar Produk</h2>
            <p>Temukan dan kelola produk yang tersedia.</p>
          </div>

          <span className="product-count">
            {products.length} Produk
          </span>
        </div>

        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  )
}

export default App