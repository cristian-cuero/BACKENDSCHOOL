const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/config")();

const Caja = sequelize.define( "Caja" , {
    idcaja:{
        type : DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: ""
    },
    prefijo:{
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: ""
    },
    numero:{
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },

}, {
    tableName: "CAJAS"
})

console.log( Caja === sequelize.model.Caja)

module.exports = {
    Caja
}