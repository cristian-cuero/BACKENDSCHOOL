const { Sequelize, DataTypes, NOW } = require("sequelize");
const { Cliente } = require("./Cliente");
const { Equipo } = require("./Equipo");
const { User } = require("./user");
const sequelize = require("../database/config")();

const Orden = sequelize.define("Ordenes", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
  },
  danoEquipo: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  estadoEquipo: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  enciende: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  simCard: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  memoria: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  constrasena: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  descuento: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  abono: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  saldo: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.valor - this.descuento - this.abono;
    },
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: NOW,
  },
  fechaEntrega: {
    type: DataTypes.DATE,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "INGRESO",
  },
  
});

Orden.belongsTo( User , {
    foreignKey: "IdUsuario",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT"
})
Orden.belongsTo( Cliente , {
    foreignKey: "IdCliente",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT"
})
Orden.belongsTo( Equipo , {
    foreignKey: "IdEquipo",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT"
})

console.log ( Orden === sequelize.model.Orden)

module.exports = {
    Orden
}