const { response } = require("express");

const validarArchivo = (req, res = response, next) => {
  const extValidas = [ "jpg" , "jpeg"];

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      msg: "no hay archivos en el servidor",
    });
  }
  if (!req.files.archivo) {
    return res.status(400).json({
      msg: "no hay archivos en el servidor",
    });
  }
  const picture = req.files.archivo.name.split(".");
  const ext = picture[picture.length - 1];

  if (!extValidas.includes(ext.toLowerCase())) {
    return res.status(400).json({
      msg: "Extension Invalida , La Extension Valida Son JPG Y JPEG",
    });
  }

  next();
};

module.exports = {
  validarArchivo,
};
