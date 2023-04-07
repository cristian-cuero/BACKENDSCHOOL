const { response, request } = require("express");
const { User } = require("../model/User");
const { Tenat } = require("../model/Tenat");



const ValidarSchema = async (req = request , res = response , next) => {
    
    const { username} = req.body
    console.log('object :>> ', req.query);
    const usuario = await User.findOne({
        where:{
            username
        },
        include:[
          {
            model: Tenat,
            attributes: ["schema"]
          }
       
        ]
      });

      //es un usuario En valido 
      if( !usuario){
            return res.status(401).json({
                mensaje: "usuario No Configutado Por Favor Validar"
            })
      }
     
       req.schema = usuario.Tenat.schema

    next();

}




module.exports = {
  ValidarSchema
}