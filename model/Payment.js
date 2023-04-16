//modelo de la tabla user
const {DataTypes } = require("sequelize");
const { Student } = require("./Student");


// se usa de esta manera por que se exporta directamente del module.export
const sequelize = require("../database/config")();


const Payment = sequelize.define("Payment", {
  idu: {
    //llave primaria es unica
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  reference: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: "",
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: '',
  },
  method: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: ''
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  user:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  }
  

});

//los usarios Son Foraneos De Un Comercio
Payment.belongsTo(Student , {
    foreignKey : "IdStudent",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})

console.log(Payment === sequelize.model.Payment);

module.exports = {
    Payment,
};
