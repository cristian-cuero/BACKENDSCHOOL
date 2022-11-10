const { Sequelize, DataTypes, DATE } = require("sequelize");
const { RelProducto } = require("./relproductos");
const { User } = require("./user");
const sequelize = require("../database/config")();

const MovimientoProducto = sequelize.define(
  "MovimientoProducto",
  {
    idMovieminto: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
  
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DATE
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
    
  },
 
);

MovimientoProducto.belongsTo(RelProducto, {
    foreignKey: "idProducto",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})



MovimientoProducto.belongsTo( User , {
    foreignKey: "Uid",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})
console.log((MovimientoProducto === sequelize.model.MovimientoProducto));

module.exports = {
    MovimientoProducto,
};
