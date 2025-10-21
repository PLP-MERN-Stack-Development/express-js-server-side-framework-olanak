const { products } = require('../db/db');
const { v4: uuidv4 } = require('uuid');
const { NotFoundError, ValidationError } = require('../utils/error');
const catchAsync = require('../middleware/catchAsync');

// Get all products (with filtering & pagination)
const GetAllproducts = catchAsync(async (req, res, next) => {
  let results = [...products]; // clone array to prevent mutation

  // Filtering by category
  if (req.query.category) {
    results = results.filter(
      (p) => p.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  //  Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginated = results.slice(startIndex, endIndex);

  res.json({
    total: results.length,
    page,
    totalPages: Math.ceil(results.length / limit),
    data: paginated,
  });
});

// Get product by ID
const GetproductById = catchAsync(async (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) throw new NotFoundError('Product not found');
  res.json(product);
});

// Create new product
const CreateProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !price) throw new ValidationError('Name and price are required');

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock,
  };

  products.push(newProduct);
  res.status(201).json({
    message: 'Product added successfully',
    product: newProduct,
  });
});

// Update product
const UpdateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) throw new NotFoundError('Product not found');

  products[productIndex] = { ...products[productIndex], ...req.body };

  res.json({
    message: 'Product updated successfully',
    product: products[productIndex],
  });
});

// Delete product
const DeleteProduct = catchAsync(async (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index === -1) throw new NotFoundError('Product not found');

  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

// Search products by name
const SearchProducts = catchAsync(async (req, res, next) => {
  const { name } = req.query;
  if (!name) throw new ValidationError('Please provide a search term');

  const results = products.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json({
    count: results.length,
    results,
  });
});

// Product statistics (count by category)
const GetProductStats = catchAsync(async (req, res, next) => {
  const stats = {};

  products.forEach((p) => {
    const cat = p.category ? p.category.toLowerCase() : 'uncategorized';
    stats[cat] = (stats[cat] || 0) + 1;
  });

  res.json({
    totalProducts: products.length,
    countByCategory: stats,
  });
});

module.exports = {
  GetAllproducts,
  GetproductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  SearchProducts,
  GetProductStats,
};
