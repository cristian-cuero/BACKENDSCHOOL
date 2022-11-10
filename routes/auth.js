const { Router } = require('express');
const { check } = require('express-validator');
const { auth } = require('../controller/loginController');
const { validarCampos } = require('../middlewares/validarcampos');

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/' ,[
    check('username').notEmpty().withMessage('El Nombre De usuario Es Obligatorio'),
     check('password').notEmpty().withMessage('La Contraseña Es Obligatoria'),
     validarCampos
],auth
)


module.exports = routes;
