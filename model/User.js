//modelo de la tabla user
const { Sequelize, DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

// se usa de esta manera por que se exporta directamente del module.export
const sequelize = require("../database/config")();

const salt = bcryptjs.genSaltSync();
const User = sequelize.define("User", {
  idu: {
    //llave primaria es unica
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", bcryptjs.hashSync(value, salt));
    },
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  estado :{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
});

console.log(User === sequelize.model.User);

module.exports = {
  User,
};
