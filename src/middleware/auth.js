// src/middleware/auth.js
require('dotenv').config();

const auth = (req, res, next) => {
  const apiKey = req.header('x-api-key'); // look for custom header

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
  }

  next();
};

module.exports = auth;
