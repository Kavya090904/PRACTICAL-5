const express = require('express');
const app = express();
const port = 3000;

// Sample product data
const products = [
  { id: 1, name: 'Laptop', category: 'electronics', price: 1200 },
  { id: 2, name: 'Shirt', category: 'clothing', price: 25 },
  { id: 3, name: 'Smartphone', category: 'electronics', price: 800 },
  { id: 4, name: 'Shoes', category: 'clothing', price: 50 },
  { id: 5, name: 'Headphones', category: 'electronics', price: 150 },
];

// Middleware to parse JSON
app.use(express.json());

// GET all products
app.get('/products', (req, res) => {
  const category = req.query.category; // Get category from query string
  if (category) {
    // Filter products by category
    const filteredProducts = products.filter(product => product.category === category);
    return res.json(filteredProducts);
  }
  // Return all products if no category is specified
  res.json(products);
});

// GET a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id); // Get product ID from route parameter
  const product = products.find(product => product.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Start the server
app.listen(port, () => {
  console.log(`E-Commerce API running on http://localhost:${port}`);
});





























  