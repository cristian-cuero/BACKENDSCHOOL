const { Op } = require("sequelize");
const { Tenat } = require("../model/Tenat");

const validaTenatUnico = async (req = request, res = response, next) => {
    const { nit, businessName, subdomain } = req.body;
    if (nit && businessName && subdomain) {
      const tenat = await Tenat.findOne({
        where: {
          [Op.or]: [{ nit }, { businessName }, { subdomain }],
        },
      });
  
      if (tenat) {
        return res.status(401).json({
          msg: `El  Inquilino Con Nit ${nit} O Razon Social ${businessName} O Subdomino ${subdomain} Ya Existe`,
        });
      }
    }else{
      return res.status(400).json({
        msg: `Bad request`,
      });
    }
  
    next();
  };


  module.exports = {
    validaTenatUnico
  }