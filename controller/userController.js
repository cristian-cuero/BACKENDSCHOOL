const { response, request } = require("express");
const { User } = require("../model/user");
const bcryptjs = require("bcryptjs");
const { validarCamposU } = require("../helpers/db-validator");


//se busca todos los usuarios
const usariosGet = async (req = request, res = response) => {
  const usuarios = await User.findAll();
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
  let user  = await User.findOne({ where: { [parametro] : busca }})
  if(!user){
    user = {};
  }
  res.json({
      user 
  })
}

//creamos un usario
const crearUsuario = async (req = request, res = response) => {
  const { username, password, nombre, apellidos, correo } = req.body;
    //encriptar contraseña
  const user = User.build({username, password, nombre, apellidos, correo});
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
  const {  username,correo, ...resto} = req.body;
  let user = await User.findByPk(ID);
  if(!user){
    return res.status(400).json({
      msg: "El usuario No Existe"
    })
  }
  try {
    user =  await user.update({...resto} ,
      {where : {idu : ID}})
  } catch (error) {
      console.log(error)
  }
  res.json(
    {...resto}
  )
}

module.exports = {
  usariosGet,
  crearUsuario,
  buscarUsuario,
  editarUser
};
