const coleccionesPermitidas = (object) => {
  console.log("object :>> ", object);
};

// se usa para validar los campos en las busquedas de las base de datos
//recibe el modelo y parametro y se valida si el parametro de la busqueda existe en los atributos
const validarCamposU = (parametro, modelo) => {
  const parametros = Object.keys(modelo.getAttributes());
  let notExist = true
  if (!Array.isArray(parametro)) {
    console.log('modelo :>> 1');
    if (parametros.includes(parametro) === false) {
      return false;
    } else {
      return true;
    }
  } else {
    
    for (let index = 0; index < parametro.length; index++) { 
       if(parametros.includes(parametro[index]) === false){
         notExist = false
           break;
       }
      
    }
  
  }
  return notExist
};

//helper Encargado De Validar Si El Que Esta Haciendo la Correcion , Actualizacion Es El Mismo usuario
 const validaUserIsEqualEdit = ( user = {}, idparams) => {
    return user.idu === idparams ? true : false
 }
module.exports = {
  coleccionesPermitidas,
  validarCamposU,
  validaUserIsEqualEdit
};
