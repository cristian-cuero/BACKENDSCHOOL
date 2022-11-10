const { Sequelize, DataTypes } = require("sequelize");
const { Caja } = require("./caja");
const { Cliente } = require("./Cliente");
const { Orden } = require("./Orden");
const { Pagare } = require("./Pagare");
const { User } = require("./user");
const sequelize = require("../database/config")();


const Pagos = sequelize.define( "PAGOS" , {
    norecibo:{
         type: DataTypes.STRING(50),
         primaryKey: true
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false
    },
    valor : {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    Descuento : {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    concepto:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    }


})
Pagos.belongsTo(Caja, {
    foreignKey: "idcaja",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})
Pagos.belongsTo( User, {
    foreignKey: "Idu",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})

Pagos.belongsTo(Cliente , {
    foreignKey: "idpersona",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})

Pagos.belongsTo(Pagare, {
    foreignKey: "Idpagare",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})

Pagos.belongsTo(Orden, {
    foreignKey: "IdOrden",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})

console.log( Pagos === sequelize.model.Pagos)

module.exports = {
    Pagos
}
