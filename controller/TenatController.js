const { request, response } = require("express");
const { Tenat } = require("../model/Tenat");
const { sincroSchema } = require("../database/Schema");
const { User } = require("../model/User");
const { validarCamposU } = require("../helpers/helperComunes");



//TODO: busca Todos Tenat OEl tenat Del Usuario Administrador
const getTenats = async (requ = request, res = response) => {

  console.log('request.params :>> ', requ.params);
  //all tenats
  if(!requ.params.nit & requ.usuario.rol === 'ROOT'){
    try {
      const tenats = await Tenat.findAll();
      res.json({
        tenats,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Se Presento El Siguiente Error",
        error
      });
    }
  }else{
    try {
      const tenat = await Tenat.findOne({ where:{ nit: requ.params.nit}  })
      res.json({
        tenat
      })
    } catch (error) {
      res.status(500).json({
        msg: "Se Presento El Siguiente Error",
        error
      }); 
    }
  }
  
};


//TODO: Busca El Tenat Por Algun Filtro 

const getFilterTenats = async = (requ = request , res = response) => {

  //valido  que los paramtros son validos para la busqueda
  const parametros =  Object.keys(requ.body) 
  
  const isparametro = validarCamposU( parametros , Tenat)
  res.json({
    msg: isparametro
  })
}

//TODO:Crear Un  Nuevo Tenat Y SU Configuracion Inciial 
const crearTenat = async (requ = request, res = response) => {
  const { Tenat: tenat, User: user } = requ.body;
  //**Creacion Del Tenat  , Del usuario Admin Y Del Schema *

  const schema =
    tenat.businessName.replace(/\s+/g, "").substring(0, 2).toLowerCase() +
    tenat.nit;

  tenat.schema = schema;
  user.rol = "ADMIN";
  const tenatc = Tenat.build(tenat);

  const respuesta = await sincroSchema(schema.toString());
  if (respuesta) {
    try {
      await tenatc.save();
      user.Idtenats = tenatc.idu;
      const userC = User.build(user);
      await userC.save();
      res.json({
        tenatc,
        userC,
      });
    } catch (error) {
      res.status(500).json({
        msg: error,
      });
    }
  } else if (respuesta != false) {
    res.status(500).json({
      msg: "Se Presento  Un Error al Crear El Schema",
    });
  } else {
    res.status(401).json({
      msg: "El Schema Ya Existe " + schema,
    });
  }
};

module.exports = {
  getTenats,
  crearTenat,
  getFilterTenats
};
