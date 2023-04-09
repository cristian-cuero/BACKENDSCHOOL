const { response, request } = require("express");
const { User } = require("../model/User");
const bcryptjs = require("bcryptjs");;
const { Tenat } = require("../model/Tenat");
const { validarCamposU } = require("../helpers/helperComunes");


//se busca todos los usuarios
const usariosGet = async (req = request, res = response) => {
  const usuarios = await User.findAll({
    include:[
      {
        model: Tenat,
        attributes: ["subdomain", "businessName", "picture"]
      }
   
    ]
  });
  const salt = bcryptjs.genSaltSync();
  res.json({
    usuarios,
  });
};

//TODO:buscar un usario por algun parametro
const buscarUsuario = async(req = request , res = response) => {
  const  {parametro, busca} = req.params
  // los corchetes es para tarerlo de manera dinamica el where
  const isparametro = validarCamposU( parametro , User)
   
  if(!isparametro){
    return res.status(500).json({
      errors: [
        {
          msg: "No Se Encontro El Parametro ", parametro,
        },
      ]
    })
  }
  let user  = await User.findAll({ 
    include:[
      {
        model: Tenat ,
        attributes:["subdomain", "businessName", "picture"]
      }
    ],
    where: { [parametro] : busca }})
  if(!user){
    user = {};
  }
  res.json({
      user 
  })
}

//TODO: Creamos Un Usuario Nuevo Al Sistema 
const crearUsuario = async (req = request, res = response) => {

  const user = User.build(req.body);
  try {
    await user.save();
    res.json({
      user
  });
  } catch (error) {
      res.status(400).json({error})
  }
  //user.set('password', )
  
};

//TODO:editar usuario 
const editarUser = async (req = request , res = response) =>{
  const {ID} = req.params;
  const {  username,email, Idtenats,password, ...resto} = req.body;
  let user = await User.findByPk(parseInt(ID));
  if(!user){
    return res.status(400).json({
      msg: "El usuario No Existe"
    })
  }
  try {
    user =  await user.update({...resto} ,
      {where : {idu : ID}})
  } catch (error) {
      res.status(500).json({
        msg: " Se Presento El Siguinete Error", error
      })
  }
  res.json(
    {user}
  )
}

module.exports = {
  usariosGet,
  crearUsuario,
  buscarUsuario,
  editarUser
};
