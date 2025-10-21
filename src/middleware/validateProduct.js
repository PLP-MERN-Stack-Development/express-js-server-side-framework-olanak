const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  // Check for required fields in creation
  if (req.method === 'POST') {
    if (!name || !description || price == null || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  }

  // For PUT/updates, fields are optional but if present, check type
  if (price !== undefined && typeof price !== 'number') {
    return res.status(400).json({ message: 'Price must be a number' });
  }
  if (inStock !== undefined && typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'inStock must be a boolean' });
  }

  next();
};

module.exports = validateProduct;
