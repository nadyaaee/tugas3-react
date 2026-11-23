const API_URL = 'http://localhost:3000/api/products'

// Fungsi untuk mengirim request ke backend
async function request(url, options = {}) {
  const response = await fetch(url, options)

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan pada server')
  }

  return data
}

// GET semua produk
export function getProducts() {
  return request(API_URL)
}

// POST tambah produk
export function createProduct(productData) {
  return request(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })
}

// PUT edit produk
export function updateProduct(id, productData) {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })
}

// DELETE hapus produk
export function deleteProduct(id) {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}
