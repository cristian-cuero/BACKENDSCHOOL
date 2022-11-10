const { Sequelize, DataTypes } = require("sequelize");
const { Producto } = require("./Producto");
const { User } = require("./user");
const sequelize = require("../database/config")();

const RelProducto = sequelize.define(
  "relProducto",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
  
    codigo: {
      type: DataTypes.STRING(50),
      unique: true,

    },

    estado:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    idProducto :{
      type: DataTypes.INTEGER.UNSIGNED,
    },
    idusuario: {
      type: DataTypes.INTEGER.UNSIGNED,
    }

    
  },
  {
    tableName: "relProducto",
  }
);

RelProducto.belongsTo(Producto, {
     foreignKey : "idProducto",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})
RelProducto.belongsTo( User , {
  foreignKey: "idusuario",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
})
console.log((RelProducto === sequelize.model.relProducto));

module.exports = {
    RelProducto,
};
