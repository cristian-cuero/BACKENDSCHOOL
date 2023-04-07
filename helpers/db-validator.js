
const { Op } = require("sequelize");
const { User } = require("../model/User");
const { Tenat } = require("../model/Tenat");

const emailExiste = async (correo = "") => {
  const user = await User.findOne({ where: { email: correo } });
  if (user) {
    throw new Error(` el correo ${correo} ya esta registrado`);
  }
};

const validarUser = async (username = "") => {
  const user = await User.findOne({ where: { username: username } });
  if (user) {
    throw new Error("El Usuario Ya Se Encuentra Registrado");
  }
};

const validarInquilino = async (Idtenats = "") => {
  if (Idtenats != "") {
    const tenat = await Tenat.findByPk(parseInt(Idtenats));
    if (!tenat) {
      throw new Error("El Inquilino No Existe");
    }
  }
};

///// valida la colecciones permitidas para actualizar la imageb

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `la coleccion ${coleccion} no es permitida colecciones permitidas ${colecciones}`
    );
  }
  //para que siga la funcion
  return true;
};

// se usa para validar los campos en las busquedas de las base de datos
//recibe el modelo y parametro y se valida si el parametro de la busqueda existe en los atributos
const validarCamposU = (parametro = "", modelo) => {
  const parametros = Object.keys(modelo.getAttributes());
  if (parametros.includes(parametro) === false) {
    return false;
  } else {
    return true;
  }
};

const validaTenatUnico = async (req, res, next) => {
  const { nit, razonSocial } = req.body;
  const tenat =  await Tenat.findOne({
    where: {
      [Op.or]: [{ nit}, { razonSocial}], 
    },
  });
  
  if(tenat){
    return res.status(401).json({
      msg: `El  Inquilino Con Nit ${nit} O Razon Social ${razonSocial} Ya Existe`
    })
  }
  next();
};

module.exports = {
  emailExiste,
  validarUser,
  validarCamposU,
  coleccionesPermitidas,
  validarInquilino,
  validaTenatUnico,
};
