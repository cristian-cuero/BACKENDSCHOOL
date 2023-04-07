const { body , query} = require("express-validator");
const { validarInquilino, emailExiste } = require("../db-validator");

exports.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("username", "El Nombre De Usuario Es Obligatorio")
          .notEmpty()
          .isLength({ min: 4, max: 30 })
          .withMessage(
            "El Nombre De usario Debe Ser Minimo De 8 maximo De 50 caracteres"
          ),
        body("password", " la contaseña Es Obligatorio")
          .notEmpty()
          .isLength({ min: 8, max: 30 })
          .withMessage(
            "La Contraseña Debe De Tener Minimo 8  Caracteres Y Maximo 50 Caracteres"
          ),
          body("nombre", "El Nombre Es Obligatorio")
          .notEmpty()
         .isLength({max:100}).withMessage('El Nombre Debe Tener Maximo 100 Caracteres'),
         body("apellidos", "El Apellido Es Obligatorio").notEmpty()
         .isLength({max:100}).withMessage('El Apellido Debe Tener Maximo 100 Caracteres'),
         body("email", "el email no es valido")
         .isEmail()
         .custom(emailExiste),
         body("Idtenats", "Id De Enquilino Invalido").isNumeric()
         .custom(validarInquilino),
         body("role", "El Rol Es Obligatorio").notEmpty()
      ];
    }
    case "editUser":{
        return[
            body("nombre", "El Nombre Es Obligatorio")
            .notEmpty()
           .isLength({max:100}).withMessage('El Nombre Debe Tener Maximo 100 Caracteres'),
           body("apellidos", "El Apellido Es Obligatorio").notEmpty()
           .isLength({max:100}).withMessage('El Apellido Debe Tener Maximo 100 Caracteres'),
           body("Idtenats", "Id De Enquilino Invalido").isNumeric()
           .custom(validarInquilino),
           body("role", "El Rol Es Obligatorio").notEmpty()
        ]
    }

    case "BuscarUsario": {
        return [
            query("parametro", "No Hay un Parametro De Busqueda").notEmpty(),
            query("busca", "no se ha ingresado un dato de busqueda").notEmpty()
        ]

    }
  }
};

