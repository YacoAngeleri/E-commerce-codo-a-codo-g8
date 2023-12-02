import express from 'express';
import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import {insertUserIntoDatabase} from "../functions/registerFunctions.js"
import bodyParser from 'body-parser';

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const registerRouter = express.Router();

registerRouter.use(bodyParser.urlencoded({ extended: true }));
registerRouter.use(bodyParser.json());

registerRouter.get('/register', async (req, res) => {
    // Ruta al archivo HTML que deseas enviar
    const htmlFilePath = path.join(__dirname, '../../public/HTML/registrarse.html');
  
    // Envía el archivo HTML como respuesta
    res.sendFile(htmlFilePath);
  });

  // Ruta para manejar el registro

  registerRouter.post('/register', async (req, res) => {
    try {
        console.log('Recibiendo solicitud POST en /register');

        // Obtener los datos del formulario de registro
        const { nombre, apellido, email, contraseña, contraseñarep } = req.body;
        await sequelize.sync();

        console.log('Datos del formulario:', { nombre, apellido, email, contraseña });

        // Realizar validaciones si es necesario

        // Insertar los datos en la base de datos
        const newUser = await insertUserIntoDatabase(nombre, apellido, email, contraseña);
        console.log('Resultado de la inserción en la base de datos:', newUser);

        // Redirigir al usuario al carrito después del registro exitoso
        res.redirect('/login');

    } catch (error) {
        console.error('Error al procesar el formulario de registro:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

  

export default registerRouter;