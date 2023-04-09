const { request, response } = require("express");
const { User } = require("../model/User");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generarWTK");
const { Tenat } = require("../model/Tenat");
const jwt = require('jsonwebtoken');

//logueo de la aplicacion
const auth = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      include: [
        {
          model: Tenat,
          attributes: ["subdomain", "businessName", "picture"],
        },
      ],
      where: { username },
    });

    if (!user) {
      return res.status(400).json({
        msg: "Usuario O Contraseña Invalida",
      });
    }
    //valido la contraseña
    const validarContraseña = bcryptjs.compareSync(password, user.password);
    if (!validarContraseña) {
      return res.status(400).json({
        msg: "Usuario O Contraseña Invalida",
      });
    }
    //valido que el usuario este activo
    if (!user.state) {
      return res.status(400).json({
        msg: "El usuario Esta Inactivo",
      });
    }
    //gebera el JWT
    const token = await generarJWT(user.username);
    return res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};


//validaciones al cambiar de pagina esto me lo va pedir el front cada vez que accede a otra URL
const validacionAuth = async (req = request, res = response) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "Token Invalido",
    });
  }
  jwt.verify(token, process.env.SECRETORPRIVATEKEY, async function  (err, token){
    if (err) {
        return res.status(401).json({
            msg: "Token Invalido"
        })
    }else{
        const {username}  = token

        try {
            const user = await User.findOne({
              include: [
                {
                  model: Tenat,
                  attributes: ["subdomain", "businessName", "picture"],
                },
              ],
              where: { username },
                
        
            });
        
            ///valido que exista el usuario
            if(!user){
        
                return res.status(401).json({
                    msg: "usario Inaxistente"
                })
            }
            //valido que este activo
            if(! user.state){
                return res.status(401).json({
                    msg: "usario Inactivo"
                })
            }
            //pendiente validar que el subdominio sea del schema
        
            const token2 = await generarJWT(user.username);
            return res.json({
                user,
                token: token2
            })
        
          } catch (error) {
            return res.status(500).json({
              msg: error,
            });
          }

    }
   
  });
 
 
};

module.exports = {
  auth,
  validacionAuth,
};
