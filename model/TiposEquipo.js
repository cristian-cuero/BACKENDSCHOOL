
const {Sequelize , DataTypes} = require ('sequelize');
const sequelize = require("../database/config")();

const TiposEquipo =  sequelize.define ( "TiposEquipo" , {

    id : {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    tipo: {
        type: DataTypes.STRING(100),
        defaultValue: "",
        allowNull: false,
        unique: true
    }
},
{
    tableName: "TiposEquipos"
});

console.log(TiposEquipo === sequelize.model.TiposEquipos)
module.exports = {
    TiposEquipo
}
