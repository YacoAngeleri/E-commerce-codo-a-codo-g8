import express from 'express';
//mport cors from 'cors';
import ProductosController from '../controllers/productosController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import bodyParser from 'body-parser';
import { findUserByEmail, findAdmin, loginUser } from '../functions/loginFunctions.js';
//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
import ejs from 'ejs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let loggedIn = false;

const loginRouter = express.Router();



loginRouter.use(bodyParser.urlencoded({ extended: true }));
loginRouter.use(bodyParser.json());



loginRouter.get('/login', async (req, res) => {
    // Ruta al archivo HTML que deseas enviar
    res.render('header', { loggedIn });

    //const htmlFilePath = path.join(__dirname, '../../public/HTML/ingresar.html');
  
    // Envía el archivo HTML como respuesta
   // res.sendFile(htmlFilePath);
  });


loginRouter.post('/login', async (req, res) => {
    try {
      console.log('Recibiendo solicitud POST en /login');
  
      const { email, contraseña } = req.body;
      console.log('Datos del formulario de inicio de sesión:', { email, contraseña });
  
      // Verifica si se trata de un inicio de sesión de administrador
      const isAdminMode = email === 'admin@admin.com';
      
      // Llama a la función loginUser con el nuevo parámetro isAdminMode
      const token = await loginUser(email, contraseña, isAdminMode);
  
      // Redirige al usuario según si es administrador o no
      if (isAdminMode) {
        const htmlFilePath = path.join(__dirname, '../../public/HTML/agregar-producto.html');
        res.sendFile(htmlFilePath);
      } else {
        
        res.render('header', { loggedIn });

        // const htmlFilePath = path.join(__dirname, '../../public/HTML/productos.html');
        // res.sendFile(htmlFilePath);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      res.status(500).json({ success: false, message: 'Nombre de usuario o Contraseña equivocada' });
    }

    loggedIn = true;
  
  });

  
  
  export default loginRouter;


