const { Sequelize } = require("sequelize");
const { Producto } = require("../model/Producto");
const { User } = require("../model/user");


const emailExiste = async (correo = "") => {
  const user = await User.findOne({ where: { correo: correo } });
  if (user) {
    throw new Error(` el correo ${correo} ya esta registrado`);
  }
};

const validarUser = async (username = "") => {
  const user = await User.findOne({ where: { username: username } });
  if (user) {
    throw new Error("El Usuario Ya Se Encuentra Registrado");
  }
};

///// valida la colecciones permitidas para actualizar la imageb

const coleccionesPermitidas = (coleccion = '' , colecciones = []) => {

  const incluida = colecciones.includes(coleccion);
  if(!incluida){
      throw new Error (`la coleccion ${coleccion} no es permitida colecciones permitidas ${colecciones}`); 
  }
  //para que siga la funcion
  return true

}; 



// se usa para validar los campos en las busquedas de las base de datos 
//recibe el modelo y parametro y se valida si el parametro de la busqueda existe en los atributos 
const validarCamposU = (parametro ="", modelo) => {
  
  const parametros = Object.keys(modelo.getAttributes()) 
  if (parametros.includes(parametro) === false){
    return false
  }else{
    return true
  }
}


//valida que el nombre del producto sea unico
const validarNombreProducto = async (nombre = "" ) => {
 
  const producto = await Producto.findOne({where: {nombre: nombre.toUpperCase() }})
   if(producto ){
    throw new Error ("El Nombre Del Producto Ya Existe");
   }
}


module.exports = {
    emailExiste,
    validarUser,
    validarCamposU,
    validarNombreProducto,
    coleccionesPermitidas
}