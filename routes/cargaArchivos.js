const {Router} = require('express');
const { check } = require('express-validator');
const { actualizarimagenCloudinary } = require('../controller/cargaArchivos');
const { coleccionesPermitidas } = require("../helpers/db-validator");
const { validarArchivo } = require('../middlewares/ValidarArchivo');
const { validarCampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = Router();

//subir imagens para  para los productos e usuarios
router.put('/:coleccion/:id', [
    validarJWT,
    validarArchivo,
    check("id").notEmpty().withMessage("El Ide Del Model Es Obligatorio")
    .isNumeric().withMessage("No Es Un Id Valido"),
    // c es la coleccion
    check('coleccion').custom(c => coleccionesPermitidas( c, ['user', 'producto'])),
    validarCampos
] , actualizarimagenCloudinary 
)

module.exports =  router

