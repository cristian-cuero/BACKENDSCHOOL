const { Router } = require('express');
const { usariosGet, crearUsuario, buscarUsuario, editarUser } = require('../controller/userController')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarcampos');
const { validate } = require('../helpers/Validaciones/userValidaciones');
const { validarJWT } = require('../middlewares/validarJWT');

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
routes.get('/' , validarJWT(["ROOT", "ADMIN"] ),  usariosGet)

//busca de usuarios por un parametro

routes.get('/:parametro/:busca',[
    validarJWT(["ROOT", "ADMIN"]),
    check('parametro').notEmpty().withMessage('El Parametro Es Obligatorio'),
    check('busca').notEmpty().withMessage('El Dato De La Busqueda Es Obligatorio'),
    validarCampos
],
buscarUsuario
);

//creacion de un usuarioi a la BD
routes.post('/' , [
    validarJWT(["ROOT", "ADMIN"]),
    validate('createUser'),
    validarCampos
], crearUsuario)

//editar usuario
routes.put('/:ID' , [
    validarJWT(["ROOT", "ADMIN"]),
    validate('editUser'),
    validarCampos
],
editarUser)

module.exports = routes;
