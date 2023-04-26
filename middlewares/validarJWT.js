const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../model/User");

const validarJWT = (roles = [])  =>  async (req = request, res = response, next) => {
  // console.log('req :>> ', req);
  const isvalidaRol = false
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    //console.log(token)
    const { user } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //console.log(username)
    // leer el usuario que corresponde al uid
    

    if (!user) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe DB",
      });
    }

    // // Verificar si el uid tiene estado true
    if (!user.state) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado: false",
      });
    }

    //esta funciones son por si el usuarioo esta editando  el mismo ya uqe ahi no se requiere rol
    if(req.baseUrl === '/api/users' && req.params){

      
    }
    if(roles.length > 0 && isvalidaRol === false){
      
        if(!roles.includes(user.rol)){
            return res.status(401).json({
                msg: "El Usuario No Puede realizar Esta Opcion",
              }); 
        }
    }

    req.usuario = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT
};
