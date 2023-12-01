import CarritoElemento from '../models/carritoElementosModel.js';
import Carritos from '../models/carritosModel.js';
import Clientes from '../models/clientesModel.js';

const CarritosController = {

  // Crear carrito para un cliente
  createCart: async (clienteId) => {
    try {
      // Verificar si el cliente existe
      const existingClient = await Clientes.findByPk(clienteId);
      
      if (!existingClient) {
        throw new Error('Cliente no encontrado');
      }
  
      // Verificar si ya existe un carrito activo para el cliente
      const existingCart = await Carritos.findOne({
        where: {
          id_cliente: clienteId,
          estado_carrito: 'activo',
        },
      });
  
      if (existingCart) {
        // Si ya hay un carrito activo, puedes retornar su ID sin crear uno nuevo
        return existingCart.id_carrito;
      }
  
      // Crear un nuevo carrito si no hay uno activo para el cliente
      const newCart = await Carritos.create({
        id_cliente: clienteId,
        estado_carrito: 'activo',
      });
  
      // Crear el carritoElementos asociado al carrito
      const newElementsCart = await CarritoElemento.create({
        id_carrito: newCart.id_carrito, // Utiliza el ID del carrito recién creado
        id_producto: 4,
        cantidad: 0,
        precio_unitario: 0.0,
      });
  
      return newCart.id_carrito;
    } catch (error) {
      throw error;
    }
  },
  


  completeCart: async (clienteId) => {
    try {
      const [_, affectedRows] = await Carritos.update(
        { estado_carrito: 'completado' },
        { where: { id_cliente: clienteId, estado_carrito: 'activo' } }
      );
  
      return affectedRows;
    } catch (error) {
      throw error;
    }
  },
  

  cancelCart: async (clienteId) => {
    try {
        const [_, affectedRows] = await Carritos.update(
            { estado_carrito: 'cancelado' },
            { where: { id_cliente: clienteId, estado_carrito: 'activo' } }
        );

        return affectedRows;
    } catch (error) {
        throw error;
    }
  },
  

  getPurchaseHistory: async (clienteId) => {
    try {
      const historialCompras = await Carritos.findAll({
        where: { id_cliente: clienteId, estado_carrito: 'completado' },
        include: [{ model: CarritoElemento, as: 'carrito_elementos', attributes: ['id_producto', 'cantidad', 'precio_unitario'] }],
      });

      return historialCompras;
    } catch (error) {
      throw error;
    }
  },
};


export default CarritosController;


