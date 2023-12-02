import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';


const Usuario = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  export default Usuario;

  