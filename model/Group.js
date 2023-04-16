//modelo de la tabla user
const {DataTypes } = require("sequelize");


// se usa de esta manera por que se exporta directamente del module.export
const sequelize = require("../database/config")();


const Group = sequelize.define("Group", {
  idu: {
    //llave primaria es unica
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    defaultValue: '',
    set(value) {
        this.setDataValue("name", value.toUpperCase());
      },
  },
  abbreviation: {
    type: DataTypes.STRING(4),
    unique: true,
    allowNull: false,
    defaultValue: "",
    set(value){
        this.setDataValue('abbreviation', value.toUpperCase())
    }
  },
  monthlyPay: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  enrollment: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  user:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  }

});



console.log(Group === sequelize.model.Group);

module.exports = {
    Group,
};
