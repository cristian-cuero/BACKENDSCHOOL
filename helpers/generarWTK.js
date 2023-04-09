//helper encargado de la generacion del JWT para autenticar el usuario
const jwt = require("jsonwebtoken");
const { User } = require("../model/User");
const { request, response } = require("express");

const generarJWT = (username = "") => {
  const payload = { username };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No Se Pudo Crear Ek JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};
//compronar el JWT


module.exports = {
  generarJWT,
};
