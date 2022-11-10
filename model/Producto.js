const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/config")();

const Producto = sequelize.define(
  "Producto",
  {
    idProducto: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      unique: true
    },
    costoc: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    costov: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    Entradas: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    Salidas: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    // es un dato virtual
    Saldo: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Entradas - this.Salidas;
      },
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    estado: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    }
    
  },
  {
    tableName: "Productos",
  }
);

console.log((Producto === sequelize.model.Producto));

module.exports = {
  Producto,
};
