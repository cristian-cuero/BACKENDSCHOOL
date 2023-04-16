
const { User } = require("../model/User");
const { Tenat } = require("../model/Tenat")
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

///// valida la colecciones permitidas para actualizar la imageb


module.exports = {
  emailExiste,
  validarUser,
  validarInquilino,
};
