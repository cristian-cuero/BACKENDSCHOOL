const { Router, response } = require("express");
const { getTenats, crearTenat } = require("../controller/TenatController");
const { validarJWT } = require("../middlewares/validarJWT");
const { validaTenatUnico } = require("../helpers/db-validator");

const routes = new Router();

// busca todo los inquilinos
routes.get("/", [validarJWT], getTenats);

//crear Un Tenat  Nuevo
routes.post("/", [validarJWT, validaTenatUnico], crearTenat);

module.exports = routes;
