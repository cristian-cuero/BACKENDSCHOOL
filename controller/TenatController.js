const { request, response } = require("express");
const { Tenat } = require("../model/Tenat");

const getTenats = async (requ = request, res = response) => {
  try {
    const tenats = await Tenat.findAll();
    res.json( {
        tenats
    })
  } catch (error) {
    res.status(500).json({
        msg: 'Se Presento El Siguiente Error', error
    })
  }
};


const crearTenat = async (requ = request, res = response) => {
    const nit = new String(requ.body.razonSocial)
    const schema =  requ.body.nit +  requ.body.businessName.replace(/\s+/g, '').substring(0, 2).toUpperCase()
    requ.body.schema = schema
    const tenat = Tenat.build(requ.body)
    try {
        
         await tenat.save()
        res.json( {
            tenat
         })
        
    } catch (error) {
        res.status(500).json( {
            msg: error
         })  
    }
   
}

module.exports = {
  getTenats,
  crearTenat
};
