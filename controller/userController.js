const { response, request } = require("express");
const { User } = require("../model/User");
const bcryptjs = require("bcryptjs");
const { validarCamposU } = require("../helpers/db-validator");
const { Tenat } = require("../model/Tenat");


//se busca todos los usuarios
const usariosGet = async (req = request, res = response) => {
  const usuarios = await User.findAll({
    include:[
      {
        model: Tenat,
        attributes: ['subdominio', 'razonSocial' , 'imagen' ]
      }
   
    ]
  });
  const salt = bcryptjs.genSaltSync();
  res.json({
    usuarios,
  });
};

//buscar un usario por algun parametro

const buscarUsuario = async(req = request , res = response) => {
  const  {parametro, busca} = req.params
  // los corchetes es para tarerlo de manera dinamica el where
  const isparametro = validarCamposU( parametro , User)
  console.log(isparametro);
  if(!isparametro){
    return res.status(500).json({
      errors: [
        {
          msg: "No Se Encontro El Parametro",
        },
      ]
    })
  }
  let user  = await User.findOne({ 
    include:[
      {
        model: Tenat ,
        attributes: ['subdominio', 'razonSocial' , 'imagen' ]
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

//editar usuario 
const editarUser = async (req = request , res = response) =>{
  const {ID} = req.params;
  const {  username,email,  Idtenats , ...resto} = req.body;
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
