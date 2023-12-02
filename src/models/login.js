// importación de conexión
import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { comparePasswords, insertUserIntoDatabase } from './register.js';
import dotenv from 'dotenv';


dotenv.config();

async function findUserByEmail(email) {
    try {
        // Consulta SQL para encontrar un usuario por su correo electrónico
        const query = 'SELECT * FROM usuarios WHERE correo = ?';
        const [rows] = await conn.execute(query, [email]);

        if (rows.length === 0) {
            // No se encontró un usuario con ese correo electrónico
            return null;
        }

        // Retorna la primera fila (debería ser único por correo electrónico)
        const user = rows[0];

        return user;
    } catch (error) {
        // Maneja cualquier error de la consulta
        console.error('Error al buscar usuario por correo electrónico:', error);
        throw error;
    }
}


// Función para verificar las credenciales y generar un token
async function loginUser(email, plainPassword) {
    try {
        const user = await findUserByEmail(email);

        if (!user) {
            throw new Error('Correo electrónico o contraseña incorrectos');
        }

        const match = await comparePasswords(plainPassword, user.contrasena);
        console.log(user.contrasena)

        if (!match) {
            throw new Error('Correo electrónico o contraseña incorrectos');
        }

        // Genera un token JWT utilizando la información del usuario
        const secret = process.env.JWT_SECRET
        const token = jwt.sign({ userId: user.id, email: user.correo }, secret, { expiresIn: '1h' });

        return token;
    } catch (error) {
        // Registra el error completo en la consola
        console.error('Error al procesar el formulario de inicio de sesión:', error);

        // Propaga el error al controlador para manejarlo
        throw new Error('Error interno del servidor');
    }
}

export default loginUser;