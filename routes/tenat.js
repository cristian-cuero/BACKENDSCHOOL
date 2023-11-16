const { Router, response } = require("express");
const {
  getTenats,
  crearTenat,
  getFilterTenats,
  updateTenat,
  updateTenatImagen,
} = require("../controller/TenatController");
const { validarJWT } = require("../middlewares/validarJWT");
const { validate } = require("../helpers/Validaciones/tenatValidaciones");
const { validarCampos } = require("../middlewares/validarcampos");
const { validaTenatUnico } = require("../middlewares/ValidarTenatUnico");
const { validarArchivo } = require("../middlewares/ValidarArchivo");

const routes = new Router();

//TODO: Busca Un Tenatn Por Un Filtro En Particularidad

routes.post("/filterTenat", [validarJWT(["ROOT"])], getFilterTenats);

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

//TODO: Editar Un Tentar
routes.put("/:id", [validarJWT("ROOT", "ADMIN")], updateTenat);

//TODO: ASignarImagen A TENAT
routes.put(
  "/picture/:id",
  [validarJWT("ROOT", "ADMIN"), validarArchivo],
  updateTenatImagen
);
module.exports = routes;
