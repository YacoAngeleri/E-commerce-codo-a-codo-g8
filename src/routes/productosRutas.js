// routes/productosRutas.js
import express from 'express';
import ProductosController from '../controllers/productosController.js';
import authMiddleware from '../middleware/authMiddleware.js';

//router.use(authMiddleware);
const router = express.Router();

router.get('/get-all', async (req, res) => {
  try {
    const results = await ProductosController.getAllProducts();
    res.json(results);
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const productId = await ProductosController.addProduct(req.body);
    res.json({ message: 'Product added successfully', productId });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Error adding product to the database' });
  }
});

router.post('/edit', async (req, res) => {
  try {
    await ProductosController.editProduct(req.body);
    res.json({ message: 'Product edited successfully' });
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ error: 'Error editing product in the database' });
  }
});

router.get('/get/:productId', async (req, res) => {
  try {
    const product = await ProductosController.getProduct(req.params.productId);
    res.json(product);
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ error: 'Error getting product from the database' });
  }
});

router.delete('/delete/:productId', async (req, res) => {
  try {
    await ProductosController.deleteProduct(req.params.productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product from the database' });
  }
});

export default router;
