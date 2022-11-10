const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/config")();

const Cliente = sequelize.define(
  "Cliente",
  {
    idpersona: {
      type: DataTypes.STRING(40),
      primaryKey: true,
    },
    nombres: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  },
  // nomnre de la  tabla
  {
    tableName: "Clientes",
  }
);

console.log(Cliente === sequelize.model.Cliente);

module.exports = {
  Cliente,
};
