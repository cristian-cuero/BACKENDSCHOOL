const { User } = require("../model/User");
const { Tenat } = require("../model/Tenat");
const { Op } = require("sequelize");

const emailExiste = async (email = "") => {
  const user = await User.findOne({ where: { email } });
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

const ValidarInquilinoUpdate = async (tenatC = {}) => {

  if (tenatC) {
   
    const tenat = await Tenat.findOne({
      where: {
        businessName: tenatC.businessName,
        [Op.not]: [{ idu: tenatC.idu }],
      },
    });
    if (tenat) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

///// valida la colecciones permitidas para actualizar la imageb

module.exports = {
  emailExiste,
  validarUser,
  validarInquilino,
  ValidarInquilinoUpdate,
};
