const { Router } = require("express");
const { check } = require("express-validator");
const { EliminarProducto } = require("../controller/productos");
const {
  CrearRelProducto,
  getRelProducto,
  getRelproductoU,
  putSalida,
} = require("../controller/relproducto");

const { validarCampos } = require("../middlewares/validarcampos");
const { validarJWT } = require("../middlewares/validarJWT");

// rutas encargadas de la administracion de la creacion de un nuevo producto y de visualizar los movimientos de estos

const router = new Router();
//buscar todos los productos
router.get("/", [validarJWT, validarCampos], getRelProducto);

//buscar un producto por el codigo
router.get ("/:codigo" , [validarJWT] , getRelproductoU)

//crear un nuevo producto
router.post(
  "/:idProducto/:cantidad?",
  [
    validarJWT,
    check("idProducto")
      .isNumeric()
      .withMessage("El Id Del producto Debe Ser Numerio")
      .notEmpty()
      .withMessage("El id Del Produtos Es Obligatorio"),
    validarCampos,
  ],
  CrearRelProducto
);

//realiza la salida de un relproducto

router.put("/:codigo", [validarJWT],  putSalida )
module.exports = router;
