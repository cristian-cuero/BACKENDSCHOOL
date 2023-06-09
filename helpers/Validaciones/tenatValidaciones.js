const { body } = require("express-validator");
const { validarUser, emailExiste } = require("../db-validator");

exports.validate = (method) => {
  switch (method) {
    case "crearTenat": {
      return [
        body("nit", "debe de ingresar el nit")
          .notEmpty()
          .isLength({ max: 20 })
          .withMessage("El Nit Debe tener Maximo 20 caracteres"),
        body("businessName", "Debe De Ingresar La razon Social")
          .notEmpty()
          .isLength({ max: 100 })
          .withMessage("la razonSocial Debe tener Maximo 100 caracteres"),
        body(
          "responsibleId",
          "debe ingresa la identificacion del responsable"
        )
          .notEmpty()
          .isLength({ max: 20 })
          .withMessage(
            "El id del responsable  Debe tener Maximo 20 caracteres"
          ),
        body("responsibleName", "debe ingresa el nombre  del responsable")
          .notEmpty()
          .isLength({ max: 100 })
          .withMessage(
            "El nombre del responsable  Debe tener Maximo 100 caracteres"
          ),
        body(
          "responsibleLastName",
          "debe ingresa el apellido  del responsable"
        )
          .notEmpty()
          .isLength({ max: 100 })
          .withMessage(
            "El apellido del responsable  Debe tener Maximo 100 caracteres"
          ),
        body("username", "El Nombre De Usuario Es Obligatorio")
          .notEmpty()
          .isLength({ min: 4, max: 30 })
          .withMessage(
            "El Nombre De usario Debe Ser Minimo De 8 maximo De 50 caracteres"
          )
          .custom(validarUser),
        body("password", " la contaseña Es Obligatorio")
          .notEmpty()
          .isLength({ min: 8, max: 30 })
          .withMessage(
            "La Contraseña Debe De Tener Minimo 8  Caracteres Y Maximo 50 Caracteres"
          ),
        body("name", "El Nombre Es Obligatorio")
          .notEmpty()
          .isLength({ max: 100 })
          .withMessage("El Nombre Debe Tener Maximo 100 Caracteres"),
        body("lastName", "El Apellido Es Obligatorio")
          .notEmpty()
          .isLength({ max: 100 })
          .withMessage("El Apellido Debe Tener Maximo 100 Caracteres"),
        body("emailUser", "el email no es valido").isEmail().custom(emailExiste),
      ];
    }
    
  }
};
