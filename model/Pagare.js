const { Sequelize, DataTypes, DATE, NOW } = require("sequelize");
const { Cliente } = require("./Cliente");
const { User } = require("./user");
const sequelize = require("../database/config")();

const Pagare = sequelize.define("Pagare", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  fechaacuerdo: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: NOW,
  },
  cuotas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  valorcuotas: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valortotal: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  abono: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  saldo :{
    type: DataTypes.VIRTUAL,
    get(){
        return this.valortotal - this.abono
    }
  },
  concepto:{
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false
  }
});

Pagare.belongsTo(Cliente, {
  foreignKey: "IDPERSONA",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

Pagare.belongsTo(User, {
  foreignKey: "Idu",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

console.log( Pagare === sequelize.model.Pagare)

module.exports = {
    Pagare
}