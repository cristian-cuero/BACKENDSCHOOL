const { Group } = require("../model/Group");
const { Payment } = require("../model/Payment");
const { PaymentAgrement } = require("../model/PaymentAgrement");
const { Student } = require("../model/Student");
const { TypeDocument } = require("../model/TypeDocument");

const sequelize = require("../database/config")();

//TODO: Funcion Encargada De Creaar un Nuevo Schema Cuando Se Crea Un Nuevo Inquilino
const sincroSchema = async (nameSchema = "") => {

  try {
    return  await sequelize.showAllSchemas({logging: false}).then( async (data) => {

        if(!data.includes(nameSchema)){
            await sequelize.createSchema(nameSchema);
            // subir modelo a otro schema await Tenat.schema(nameSchema).sync()
            await Group.schema(nameSchema).sync()
            await TypeDocument.schema(nameSchema).sync()
            await Student.schema(nameSchema).sync()
            await Payment.schema(nameSchema).sync()
            await PaymentAgrement.schema(nameSchema).sync()
            return true;
        }else{
            return 'El Esquema Ya Existe'
        }

    })
   
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  sincroSchema,
};
