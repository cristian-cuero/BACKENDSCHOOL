///archivo que contiene la instancia del sequelize para poder ser reutilizado por los demas

const {Sequelize, DataTypes} = require('sequelize');


module.exports= () => {
    const sequelize =  new  Sequelize({
        dialect: 'postgres',
        host : process.env.HOSTDB,
        username: process.env.USERDB,
        password: process.env.PASSWORDDB,
        database: process.env.DATABASE,
        dialectOptions: {
            ssl: true,
            native:true
          }
    })
    return sequelize
}

  
