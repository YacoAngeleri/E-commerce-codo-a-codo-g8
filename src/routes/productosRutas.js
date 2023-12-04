import express from 'express';
import multer from 'multer';
import path from 'path';
import ProductosController from '../controllers/productosController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Configuración de Multer para almacenar archivos en una carpeta temporal
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Ruta donde se almacenarán los archivos temporalmente
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Usa el nombre original del archivo
    }
});

const upload = multer({ storage: storage });

router.get('/get-all', async (req, res) => {
  try {
    const results = await ProductosController.getAllProducts();
    res.json(results);
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
});

router.post('/add', upload.single('imagen'), async (req, res) => {
  // Accede a los datos enviados desde el formulario
  const { categoria, licencia, nombre, descripcion, sku, precio, stock, descuento, cuotas } = req.body;

  try {
    // Aquí puedes usar la ruta del archivo (imagen) como desees
    const filePath = req.file.path;

    // Llamada a la función del controlador para agregar el producto
    const productId = await ProductosController.addProduct({
      categoria,
      licencia,
      nombre,
      descripcion,
      sku,
      precio,
      stock,
      descuento,
      cuotas,
      imagen: filePath  // Usa la ruta del archivo en lugar del nombre
    });

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
