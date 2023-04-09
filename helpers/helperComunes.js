const coleccionesPermitidas = (object) => {
      console.log('object :>> ', object);
   
  };

  // se usa para validar los campos en las busquedas de las base de datos
//recibe el modelo y parametro y se valida si el parametro de la busqueda existe en los atributos
const validarCamposU = (parametro = "", modelo) => {
  const parametros = Object.keys(modelo.getAttributes());
  if (parametros.includes(parametro) === false) {
    return false;
  } else {
    return true;
  }
};
  


  module.exports = {
    coleccionesPermitidas,
    validarCamposU
  }