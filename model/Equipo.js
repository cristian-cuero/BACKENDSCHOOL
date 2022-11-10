const { Sequelize, DataTypes } = require("sequelize");
const { Cliente } = require("./Cliente");
const { TiposEquipo } = require("./TiposEquipo");
const sequelize = require("../database/config")();

const Equipo = sequelize.define( "Equipo" , {
    
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true
    },
    nombreequipo: {
        type: DataTypes.STRING(50),
        defaultValue: "",
        allowNull: false
    },
    imeiequipo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: ""
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: ""
    },
    estadoEquipo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },



})

Equipo.belongsTo(Cliente , {
    foreignKey: "Idpersona",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT"
})

Equipo.belongsTo(TiposEquipo , {
    foreignKey: "IdTipoEquipo",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT"
})

console.log ( Equipo === sequelize.model.Equipo)

module.exports ={
    Equipo
}