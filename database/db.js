//se valida la conexion con el servidor y se migran las tablas 


const { Tenat } = require('../model/Tenat');
const { User } = require('../model/User');

const sequelize = require('../database/config')()

 //valida que haya conexion con la BD
 const dbConnections = async() => {
     try {
            //migracion De BD
            await sequelize.authenticate();
            await Tenat.sync();
            await User.sync();       
         
         console.log("Conexion Con La BD")
      } catch (error) {
          console.log(error)
     }
  }

  module.exports = {
    dbConnections
  }