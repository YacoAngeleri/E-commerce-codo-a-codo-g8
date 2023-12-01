import express from 'express';
import cors from 'cors';
import loginUser from "../models/login.js"
import ProductosController from '../controllers/productosController.js';
import authMiddleware from '../middleware/authMiddleware.js';

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const loginRouter = express.Router();

loginRouter.get('/login', async (req, res) => {
    // Ruta al archivo HTML que deseas enviar
    const htmlFilePath = path.join(__dirname, '../../public/HTML/ingresar.html');
  
    // Envía el archivo HTML como respuesta
    res.sendFile(htmlFilePath);
  });

  loginRouter.post('/login', async (req, res) => {
    try {
        console.log('Recibiendo solicitud POST en /login');
        const { email, contraseña } = req.body;
        console.log('Datos del formulario de inicio de sesión:', { email, contraseña });

        // Intenta iniciar sesión
        const token = await loginUser(email, contraseña);

        
  
    // Envía el archivo HTML como respuesta
    const htmlFilePath2 = path.join(__dirname, '../../public/HTML/productos.html');
    res.sendFile(htmlFilePath2);
       
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});
export default loginRouter;