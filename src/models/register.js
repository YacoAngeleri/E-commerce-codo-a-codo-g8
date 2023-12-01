// importación de conexión
import sequelize from '../config/sequelize.js';
import bcrypt from 'bcrypt';



async function hashPassword(plainPassword) {
    const saltRounds = 10; // Número de rondas de sal para la encriptación

    // Genera el hash utilizando bcrypt
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    return hashedPassword;
}


// Función para insertar un usuario en la base de datos
async function insertUserIntoDatabase(nombre, apellido, email, contraseña) {

    const hashedPassword = await hashPassword(contraseña);

    // Utiliza los nombres de parámetros correctos
    const query = 'INSERT INTO usuarios (nombre, apellido, correo, contrasena) VALUES (?, ?, ?, ?)';
    const values = [nombre, apellido, email, hashedPassword];
    const [result] = await conn.execute(query, values);
    return result;
}


async function comparePasswords(plainPassword, hashedPassword) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    console.log(plainPassword);
    console.log(hashedPassword)
    return match;
    
}

export { comparePasswords, insertUserIntoDatabase } 
