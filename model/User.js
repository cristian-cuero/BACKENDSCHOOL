//modelo de la tabla user
const { Sequelize, DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");
const { Tenat } = require("./Tenat");

// se usa de esta manera por que se exporta directamente del module.export
const sequelize = require("../database/config")();

const salt = bcryptjs.genSaltSync();
const User = sequelize.define("User", {
  idu: {
    //llave primaria es unica
    type: DataTypes.SMALLINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(30),
    unique: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
  },
  apellidos: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "",
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", bcryptjs.hashSync(value, salt));
    },
  },
  
  estado :{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  role: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: ''
  },
  imagen: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: "",
  },


});

//los usarios Son Foraneos De Un Comercio
User.belongsTo(Tenat, {
  foreignKey : "Idtenats",
 onUpdate: "CASCADE",
 onDelete: "RESTRICT",
})

console.log(User === sequelize.model.User);

module.exports = {
  User,
};
