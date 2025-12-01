const express = require('express');
const router = express.Router();
const pool = require('./connection'); // import the DB pool

// Test route
router.get('/', (req, res) => {
  res.send('Сервер работает 🚀');
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.products');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при запросе к БД:', err.message);
    res.status(500).send(err.message);
  }
});

// Get product by id
router.get('/product/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log("Requested product id:", id);

  try {
    const result = await pool.query(
      'SELECT * FROM public.products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error getting product:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Test route to debug
router.get('/test', (req, res) => {
  console.log('Test route hit!');
  res.send('OK');
});

module.exports = router;
