//modelo de la tabla user
const {DataTypes } = require("sequelize");

// se usa de esta manera por que se exporta directamente del module.export
const sequelize = require("../database/config")();


const TypeDocument = sequelize.define("TypeDocument", {
  idu: {
    //llave primaria es unica
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  nameDocument: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    defaultValue: '',
    set(value) {
        this.setDataValue("name", value.toUpperCase());
      },
  },
  abbreviation: {
    type: DataTypes.STRING(10),
    unique: true,
    allowNull: false,
    defaultValue: "",
    set(value){
        this.setDataValue('abbreviation', value.toUpperCase())
    }
  },

});

console.log(TypeDocument === sequelize.model.TypeDocument);

module.exports = {
    TypeDocument,
};
