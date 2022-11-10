const { Router } = require("express");
const { check } = require("express-validator");
const {
  getProductos,
  crearProducto,
  getProducto,
  EditarProducto,
  EliminarProducto,
} = require("../controller/productos");
const { validarNombreProducto } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares/validarcampos");
const { validarJWT } = require("../middlewares/validarJWT");

const router = new Router();

//buscar un producto pot algun parametro

router.get("/:parametro/:busca", [validarJWT], getProducto);

//todos los productos
router.get("/", [validarJWT], getProductos);

//crear un nuevo producto
router.post(
  "/",
  [
    validarJWT,
    check("nombre")
      .notEmpty()
      .withMessage("El Nombre Es Obligatorio")
      .isLength({ max: 255 })
      .withMessage("El Nombre No Puede Ser Mayor A 255 Caracteres")
      .custom(validarNombreProducto),
    validarCampos,
  ],
  crearProducto
);

//editar un producto
router.put(
  "/:id",
  [
    validarJWT,
    check("id").isNumeric().withMessage("El Id Debe Ser Numerico"),
    check("nombre")
      .notEmpty()
      .withMessage("El Nombre Es Obligatorio")
      .isLength({ max: 255 })
      .withMessage("El Nombre No Puede Ser Mayor A 255 Caracteres"),
    validarCampos,
  ],
  EditarProducto
);


//eliminar producto
router.delete(
  "/:id",
  [
    validarJWT,
    check("id").isNumeric().withMessage("El Id Debe Ser Numerico"),
    validarCampos,
  ],
  EliminarProducto
);

module.exports = router;
