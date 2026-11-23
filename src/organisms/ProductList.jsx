import ProductCard from '../molecules/ProductCard'

function ProductList({ products, onEdit, onDelete, viewMode }) {
  const isList = viewMode === 'list'

  return (
    <div
      className={`mt-6 grid gap-6 ${
        isList
          ? 'grid-cols-1 gap-4'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          viewMode={viewMode}
        />
      ))}
    </div>
  )
}

export default ProductList
