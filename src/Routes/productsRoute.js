const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');

const {
  GetAllproducts,
  GetproductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  SearchProducts,
  GetProductStats,
} = require('../Controllers/productController');

// 🔹 Advanced routes
router.get('/search', SearchProducts);
router.get('/stats', GetProductStats);

// 🔹 Basic routes
router.get('/', GetAllproducts);
router.get('/:id', GetproductById);
router.post('/', auth, validateProduct, CreateProduct);
router.put('/:id', auth, validateProduct, UpdateProduct);
router.delete('/:id', auth, DeleteProduct);

module.exports = router;
