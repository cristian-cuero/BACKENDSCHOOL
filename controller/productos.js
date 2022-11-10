const { response, request } = require("express");
const { validarCamposU } = require("../helpers/db-validator");
const { Producto } = require("../model/Producto");
const { options } = require("../routes/cargaArchivos");
const { Op } = require('sequelize');

//todos los productos
const getProductos = async (req = request, res = response) => {
  //para paginar
  const { desde = 0, limite = 10 } = req.query;

  const productos = await Producto.findAll({
    offset: parseInt(desde),
    limit: parseInt(limite),
    order: ["nombre"],
  });

  res.json({
    productos,
  });
};

//producto por algun campos

const getProducto = async (req = request, res = response) => {
  const { parametro, busca } = req.params;
  const { desde = 0, limite = 10 } = req.query;
  //valida si existe el parametro
  const isparametro = validarCamposU(parametro, Producto);

  //si no existe devolvemos que no existe
  if (!isparametro) {
    return res.status(400).json({
      errors: [
        {
          msg: "No Se Encontro El Parametro",
        },
      ],
    });
  }

  //BBUSCAMOS EL PRODUCTO
  const productos = await Producto.findAll({
    offset: parseInt(desde),
    limit: parseInt(limite),
    where: { [parametro]: busca },
    order: ["nombre"],
  });

  if (!productos) {
    productos = {};
  }
  res.json({
    productos,
  });
};
//crea Un Producto En la Base De Datos
const crearProducto = async (req = request, res = response) => {
  const {
    nombre,
    costoc = 0,
    costov = 0,
    Entradas = 0,
    Salidas = 0,
    imagen = "",
  } = req.body;
  const producto = Producto.build({
    nombre: nombre.toUpperCase(),
    costoc,
    costov,
    Entradas,
    Salidas,
    imagen,
  });
  try {
    await producto.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          msg: "No Se Pudo guardar El usuario",
        },
      ],
    });
  }
  res.json({
    producto,
  });
};

//editar productos por id

const EditarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  let producto;
  const { nombre, ...data } = req.body;
  //valido que no exista un producto digferente al que  se va editar que tenga ese nombre
  producto = await Producto.findOne({
    where: {
      nombre: nombre.toUpperCase(),
      idProducto: {[Op.notIn]: [id]},
    
    },
  });
  if(producto){
    return res.status(400).json({
      errors: [
        {
          msg: "El Nombre Del Producto " + nombre + " Ya Se Encuentra registrado",
        },
      ],
    });
  }
  producto = await Producto.findByPk(id);
  if (!producto) {
    return res.status(400).json({
      errors: [
        {
          msg: "El Producto No Existe",
        },
      ],
    });
  }

  try {
    producto = await producto.update(
      { nombre: nombre.toUpperCase(), ...data },
      {
        where: { idProducto: id },
      }
    );
    res.json({
      producto,
    });
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: error,
        },
      ],
    });
  }
};
//elimina un producto , lo pone en estado false para poder teber historial

const EliminarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  let producto;

  //busco si existe el producto
  producto = await Producto.findByPk(id);
  if (!producto) {
    return res.status(400).json({
      errors: [
        {
          msg: "El Producto No Existe",
        },
      ],
    });
  }

  try {
    producto = await producto.update(
      { estado: false },
      {
        where: { idProducto: id },
      }
    );

    res.json({
      producto,
    });
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: error,
        },
      ],
    });
  }
};

module.exports = {
  getProductos,
  crearProducto,
  getProducto,
  EditarProducto,
  EliminarProducto,
};
