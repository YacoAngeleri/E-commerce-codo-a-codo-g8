import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import registerRouter from '../routes/registerRouter.js';
import loginRouter from '../routes/loginRouter.js';
import authMiddleware from '../middleware/authMiddleware.js';
import productosRoutes from '../routes/productosRutas.js';
import carritosRoutes from '../routes/carritosRutas.js';
import carritoElementosRoutes from '../routes/carritoElementosRutas.js';
import ventasRoutes from '../routes/ventasRutas.js';
import authRoutes from '../routes/usuarioRutas.js';
import mainRoutes from '../routes/mainRutas.js';

import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/*
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
*/

// Carga las variables de entorno para el server
const app = express();
dotenv.config();
const port = process.env.SERVER_PORT;



app.use(cors());
// Configura express.static para servir archivos estáticos desde la carpeta 'public'
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json());

// Rutas que requieren autenticación con token
app.use('/api/productos', productosRoutes);
app.use('/carritos', carritosRoutes);
app.use('/api/carrito-elementos', carritoElementosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/users', authRoutes);
app.use('/api/', mainRoutes);
app.use('/', loginRouter);
app.use('/', registerRouter);


app.set('port', port);

// Configuración body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


export default app; // Exporta la instancia de Express o el servidor configurado
