const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// GET semua produk
router.get('/', getAllProducts);

// GET detail produk
router.get('/:id', getProductById);

// POST tambah produk
router.post('/', createProduct);

// PUT edit produk
router.put('/:id', updateProduct);

// DELETE produk
router.delete('/:id', deleteProduct);

module.exports = router;
