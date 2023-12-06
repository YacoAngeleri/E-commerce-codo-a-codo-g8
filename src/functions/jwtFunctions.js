import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Función para decodificar un token y obtener el email
const decodeTokenUser = (token) => {
    try {
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);
      const userId = decoded.id_usuario;
  
      return userId;
    } catch (error) {
      // Manejar errores de decodificación (por ejemplo, token inválido)
      console.error('Error al decodificar el token:', error);
      throw new Error('Token inválido');
    }
  };

export { decodeTokenUser } ;