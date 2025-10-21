const express = require('express');
const productsRouter = require('./Routes/productsRoute.js');
const logger = require('./middleware/logger.js');
const globalErrorHandler = require('./middleware/errorMiddleware.js');


const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(logger); // Logs all requests
app.use(express.json()); // Parse JSON bodies


// Use the products router for all /api/products routes
app.use('/api/products', productsRouter);


//default route
app.get('/', (req, res) => {
    res.send("Welcome to Products API App")

});


// Handle undefined routes (Express 5 safe)
app.all(/.*/, (req, res, next) => {
  const { NotFoundError } = require('./utils/error.js');
  next(new NotFoundError(`Cannot find ${req.originalUrl} on this server`));
});


app.use(globalErrorHandler); // Global error handler

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);

});