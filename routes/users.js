const { Router } = require('express');
const { usariosGet, crearUsuario, buscarUsuario, editarUser } = require('../controller/userController')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarcampos');
const { validarUser, emailExiste, validarCamposU } = require('../helpers/db-validator');

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
routes.get('/' ,  usariosGet)

//busca de usuarios por un parametro

routes.get('/:parametro/:busca',[
    check('parametro').notEmpty().withMessage('El Parametro Es Obligatorio'),
    check('busca').notEmpty().withMessage('El Dato De La Busqueda Es Obligatorio'),
    validarCampos
],
buscarUsuario
);

//creacion de un usuarioi
routes.post('/' , [
    check('username').notEmpty().withMessage('El Nombre De usario Es Obligatorioa')
    .isLength({ min: 4 , max:50}).withMessage('El Nombre De usario Debe Ser Minimo De 8 maximo De 50 caracteres')
    .custom( validarUser),
    check('password').notEmpty().withMessage(" la contaseña Es Obligatorio")
    .isLength({min: 8 ,max:50}).withMessage( 'La Contraseña Debe De Tener Minimo 8  Caracteres Y Maximo 50 Caracteres'),
    check('nombre').notEmpty().withMessage("'El  Es Obligatorio")
    .isLength({max:255}).withMessage('El Nombre Debe Tener Maximo 255 Caracteres'),
    check('apellidos').notEmpty().withMessage("'El Apellido Es Obligatorio")
    .isLength({max:255}).withMessage('El Apellido Debe Tener Maximo 255 Caracteres'),
    check('correo').notEmpty().withMessage('El Correo Es requerido')
    .isEmail().withMessage('El Email No Es Valido')
    .custom(emailExiste),
    validarCampos
], crearUsuario)

//editar usuari
routes.put('/:ID' ,
editarUser)

module.exports = routes;
