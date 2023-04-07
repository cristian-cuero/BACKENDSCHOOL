const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarcampos");
const { usariosGet } = require("../controller/UserPruaba");
const { ValidarSchema } = require("../middlewares/ValidarSchema");

const routes = new  Router();

routes.get("/", [
    ValidarSchema,
  check("username").notEmpty().withMessage("Es Necesario El Usuario"),
  validarCampos
], usariosGet);

module.exports = routes
