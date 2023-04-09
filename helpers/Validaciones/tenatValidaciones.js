const { body } = require("express-validator");


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
          body("responsibleId", "debe ingresa la identificacion del responsable")
          .notEmpty()
          .isLength({ max: 20 })
          .withMessage("El id del responsable  Debe tener Maximo 20 caracteres"),
          body("responsibleName", "debe ingresa el nombre  del responsable")
          .notEmpty()
          .isLength({ max: 100 })
          .withMessage("El nombre del responsable  Debe tener Maximo 100 caracteres"),
          body("responsibleLastName", "debe ingresa el apellido  del responsable")
          .notEmpty()
          .isLength({ max: 100 })
          .withMessage("El apellido del responsable  Debe tener Maximo 100 caracteres"), 
      ];
    }
  }
};
