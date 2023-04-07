const { Tenat } = require("../model/Tenat");
const { User } = require("../model/User");

const usariosGet = async (req = request, res = response) => {
    const usuarios = await User.schema(req.schema).findAll({
      include:[
        {
          model: Tenat,
          attributes: ["subdominio"]
        }
     
      ]
    });
    res.json({
      usuarios,
    });
  };

  module.exports = {
    usariosGet
  }