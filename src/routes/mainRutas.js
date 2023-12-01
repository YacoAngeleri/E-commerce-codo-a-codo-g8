import express from 'express';
import MainController from '../controllers/mainController.js';

const router = express.Router();
router.get('/home', async (req, res) => {
    try {
        const results = await MainController.getHome();
        res.json(results);
    } catch (error) {
        console.error('Error al obtener datos desde la base de datos:', error);
        res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
    }
});

router.get('/contact', async (req, res) => {
    try {
        const result = await MainController.getContact();
        res.json({ message: result });
    } catch (error) {
        console.error('Error al obtener la ruta de contact:', error);
        res.status(500).json({ error: 'Error al obtener la ruta de contact' });
    }
});

router.get('/about', async (req, res) => {
    try {
        const result = await MainController.getAbout();
        res.json({ message: result });
    } catch (error) {
        console.error('Error al obtener la ruta de about:', error);
        res.status(500).json({ error: 'Error al obtener la ruta de about' });
    }
});

router.get('/faqs', async (req, res) => {
    try {
        const result = await MainController.getFaqs();
        res.json({ message: result });
    } catch (error) {
        console.error('Error al obtener la ruta de faqs:', error);
        res.status(500).json({ error: 'Error al obtener la ruta de faqs' });
    }
});

export default router;
