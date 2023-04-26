const { request, response } = require("express");
const { Tenat } = require("../model/Tenat");
const { sincroSchema } = require("../database/Schema");
const { User } = require("../model/User");
const { validarCamposU } = require("../helpers/helperComunes");
const { ValidarInquilinoUpdate } = require("../helpers/db-validator");
const { SubirImagen } = require("../helpers/SubirImagen");

//TODO: busca Todos Tenat OEl tenat Del Usuario Administrador
const getTenats = async (requ = request, res = response) => {
  console.log("request.params :>> ", requ.params);
  //all tenats
  if (!requ.params.nit & (requ.usuario.rol === "ROOT")) {
    try {
      const tenats = await Tenat.findAll();
      res.json({
        tenats,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Se Presento El Siguiente Error",
        error,
      });
    }
  } else {
    try {
      const tenat = await Tenat.findOne({ where: { nit: requ.params.nit } });
      res.json({
        tenat,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Se Presento El Siguiente Error",
        error,
      });
    }
  }
};

//TODO: Busca El Tenat Por Algun Filtro

const getFilterTenats = async (requ = request, res = response) => {
  //valido  que los paramtros son validos para la busqueda
  const parametros = Object.keys(requ.body);

  const isparametro = validarCamposU(parametros, Tenat);
  if (isparametro) {
    try {
      const tenat = await Tenat.findAll({
        where: requ.body,
      });
      res.json({
        tenat,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Se Presento El Siguiente Error",
        error,
      });
    }
  } else {
    return res.status(400).json({
      msg: "Parametros De Busqueda Invailidos",
    });
  }
};

//TODO:Crear Un  Nuevo Tenat Y SU Configuracion Inciial
const crearTenat = async (requ = request, res = response) => {
  const { address,businessName, email, nit , responsibleId, responsibleLastName, responsibleName,
    responsiblePhone,subdomain, lastName, name, password , username, emailUser} = requ.body;
  //**Creacion Del Tenat  , Del usuario Admin Y Del Schema *

  //console.log('requ.body :>> ', requ.body);
  //console.log('requ.files :>> ', requ.files);
  //url =  await SubirImagen('',  requ.files.image) 

  const tenat = {
    address,
    businessName,
    email,
    nit,
    responsibleId,
    responsibleId,
    responsibleLastName,
    responsibleName,
    responsiblePhone,
    subdomain
  }
  const user = {
    lastName,
    name,
    password,
    username,
    email: emailUser
  }


  const schema =
    tenat.businessName.replace(/\s+/g, "").substring(0, 2).toLowerCase() +
    tenat.nit;

  tenat.schema = schema;
  user.rol = "ADMIN";
 
  let url = ''
  if (requ.files) {
  
    //console.log('requ.body :>>' ,requ.files.image);
    try {
      url =  await SubirImagen('',  requ.files.image) 
    } catch (error) {
      console.log('error :>> ', error);
      return res.status(400).json({
        msg: "Error Al Subir La Imahen Por Favor Intar De Nuevo"
      })
    }
     
  }

  tenat.picture = url
  const tenatc = Tenat.build(tenat);
  const respuesta = await sincroSchema(schema.toString());
 

  if (respuesta) {
    try {  

       //**si Viene Una Imageb la Sube A Clodinary */
     
      tenat.picture = url;
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

const updateTenat = async (requ = request, res = response) => {
  const { id } = requ.params;
  const { nit, schema, subdomain, ...data } = requ.body;
  try {
    const dataT = {
      businessName: data.businessName,
      idu: id,
    };
    const resP = await ValidarInquilinoUpdate(dataT);
    if (resP) {
      return res.status(400).json({
        msg: "No Se Puede Actualizar El Tenat , validar Que La Razon Social Sea Unica",
      });
    }
    let tenat = await Tenat.findByPk(id);
    if (!tenat) {
      return res.status(400).json({
        msg: "El tenat No Existe",
      });
    }
    tenat = await tenat.update({ ...data });
    return res.json({
      tenat,
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const updateTenatImagen = async (requ = request, res = response) => {
  const { id } = requ.params;

  try {
    const tenat = await Tenat.findByPk(id);

    if (!tenat) {
      return res.status(400).json({
        msg: "El Tenat No Existe",
      });
    }

    const url = await SubirImagen(tenat.picture, requ.files.archivo);

    if (url != null) {
      tenat.update({ picture: url });
      res.json({
        picture: tenat.picture,
      });
    } else {
      return res.status(400).json({
        msg: "Error Al Subir La Imagen",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};
module.exports = {
  getTenats,
  crearTenat,
  getFilterTenats,
  updateTenat,
  updateTenatImagen,
};
