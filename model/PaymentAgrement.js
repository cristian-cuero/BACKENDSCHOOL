//modelo de la tabla user
const {DataTypes } = require("sequelize");

const { Student } = require("./Student");


// se usa de esta manera por que se exporta directamente del module.export
const sequelize = require("../database/config")();


const PaymentAgrement = sequelize.define("PaymentAgrement", {
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
  attending: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: "",
    comment: 'Nombre Y Apellido Del Acudiente'
  },
  attendingDocument:{
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: '',
    comment: 'Documente Del Acudiente'
  },
  monthOwed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: 'Meses Dispuestp A Pagar'
  },
  datePay: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  state: {
    type: DataTypes.STRING(50),
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
PaymentAgrement.belongsTo(Student , {
    foreignKey : "IdStudent",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})

console.log(PaymentAgrement === sequelize.model.PaymentAgrement);

module.exports = {
    PaymentAgrement,
};
