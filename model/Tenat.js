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
  businessName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
    unique: true
  },

  address:{
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",

  },
  responsibleId:{
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "",

  },
  
  responsibleName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
  },
  responsibleLastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
  },
  responsiblePhone: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
  },
  subdomain: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: "",
    unique: true
  },
  email: {
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
  state :{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
});

console.log(Tenat === sequelize.model.Tenat);

module.exports = {
    Tenat,
};
