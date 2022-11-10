//se valida la conexion con el servidor y se migran las tablas 

const { Caja } = require('../model/caja');
const { Cliente } = require('../model/Cliente');
const { Equipo } = require('../model/Equipo');
const { MovimientoProducto } = require('../model/movimientoProducto');
const { Orden } = require('../model/Orden');
const { Pagare } = require('../model/Pagare');
const { Pagos } = require('../model/Pagos');
const { Producto } = require('../model/Producto');
const { RelProducto } = require('../model/relproductos');
const { TiposEquipo } = require('../model/TiposEquipo');
const { User } = require('../model/user');

const sequelize = require('../database/config')()

 //valida que haya conexion con la BD
 const dbConnections = async() => {
     try {
            //migracion De BD
            await sequelize.authenticate();
            await User.sync();
            await Cliente.sync();
            await TiposEquipo.sync();
            await Pagare.sync();
            await Producto.sync();
            await Equipo.sync();
            await RelProducto.sync();
            await Orden.sync();
            await MovimientoProducto.sync();
            await Caja.sync();
            await Pagos.sync();
            
           
         console.log("Conexion Con La BD")
      } catch (error) {
          console.log(error)
     }
  }

  module.exports = {
    dbConnections
  }