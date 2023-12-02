import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { comparePasswords, insertUserIntoDatabase } from './registerFunctions.js';
import dotenv from 'dotenv';


dotenv.config();

const findUserByEmail = async (email) => {
    try {
      const user = await Usuario.findOne({
        where: {
          correo: email,
        },
      });
  
      return user;
    } catch (error) {
      console.error('Error al buscar usuario por correo electrónico:', error);
      throw error;
    }
  };
  
  export { findUserByEmail };



// Función para verificar las credenciales y generar un token
const loginUser = async (email, plainPassword) => {
    try {
      const user = await findUserByEmail(email);
  
      if (!user) {
        throw new Error('Correo electrónico o contraseña incorrectos');
      }
  
      const match = await comparePasswords(plainPassword, user.contrasena);
  
      if (!match) {
        throw new Error('Correo electrónico o contraseña incorrectos');
      }
  
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign({ userId: user.id, email: user.correo }, secret, { expiresIn: '1h' });
  
      return token;
    } catch (error) {
      console.error('Error al procesar el formulario de inicio de sesión:', error);
      throw new Error('Error interno del servidor');
    }
  };
  
  export default loginUser;