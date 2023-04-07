//modelo de la tabla user
const { Sequelize, DataTypes } = require("sequelize");

// se usa de esta manera por que se exporta directamente del module.export
const sequelize = require("../database/config")();

const Tenat = sequelize.define("Tenat", {
  idu: {
    //llave primaria es unica
    type: DataTypes.SMALLINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  nit:{
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue:'',
    unique: true

  },
  razonSocial: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
    unique: true
  },
  dirreccion: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
  },
  idResponsable:{
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "",

  },
  nombreResponsable: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
  },
  apellidosResponsable: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
  },
  telefonoResponsable: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
  },
   subdominio: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: "",
  },
  correo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
 
  schema: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
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

console.log(Tenat === sequelize.model.Tenat);

module.exports = {
    Tenat,
};
