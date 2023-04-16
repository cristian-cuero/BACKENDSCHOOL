const { Router, response } = require("express");
const {
  getTenats,
  crearTenat,
  getFilterTenats,
} = require("../controller/TenatController");
const { validarJWT } = require("../middlewares/validarJWT");
const { validate } = require("../helpers/Validaciones/tenatValidaciones");
const { validarCampos } = require("../middlewares/validarcampos");
const { validaTenatUnico } = require("../middlewares/ValidarTenatUnico");

const routes = new Router();

//TODO: Busca Un Tenatn Por Un Filtro En Particularidad

routes.get("/filterTenat", [validarJWT(["ROOT"])], getFilterTenats);

// TODO: busca todo los inquilinos o busca El Tenat Del Administrador
routes.get("/:nit?", validarJWT(["ROOT", "ADMIN"]), getTenats);

//TODO: crear Un Tenat  Nuevo
routes.post(
  "/",
  [
    validarJWT(["ROOT"]),
    validaTenatUnico,
    validate("crearTenat"),
    validarCampos,
  ],
  crearTenat
);

module.exports = routes;
