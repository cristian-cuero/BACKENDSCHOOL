const { response, request } = require("express");
const { validarCamposU } = require("../helpers/db-validator");
const { Producto } = require("../model/Producto");
const { RelProducto } = require("../model/relproductos");
const { User } = require("../model/user");

//busca todos los productos
const getRelProducto = async (req = request, res = response) => {
  const { desde = 0, limite = 10 } = req.query;
  let relProductos;
  try {
    relProductos = await RelProducto.findAll({
      //incluyendo los usuario y los productos es ijner

      include: [
        {
          model: Producto,
          //que atributos quiero
          attributes: ["nombre", "costov", "entradas", "salidas"],
        },
        {
          model: User,
          //que atributos quiero
          attributes: ["username"],
        },
      ],
      offset: parseInt(desde),
      limit: parseInt(limite),
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }

  res.json({
    relProductos,
  });
};

//busca un producto por los diferentes atributos de la tabla
const getRelproductoU = async (req = request, res = response) => {
  const { codigo } = req.params;
  const { desde = 0, limite = 10 } = req.query;

  try {
    //procedemos a buscar el Relproducto
    const relproducto = await RelProducto.findAll({
      where: {
        codigo,
      },
      include: [
        {
          model: Producto,
          //que atributos quiero
          attributes: ["nombre", "costov", "entradas", "salidas"],
        },
        {
          model: User,
          //que atributos quiero
          attributes: ["username"],
        },
      ],
      offset: parseInt(desde),
      limit: parseInt(limite),
    });

    return res.json({
      relproducto,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

//encargado de realizar la salida en un relproducto
const putSalida = async (req = request, res = response) => {
  const { codigo } = req.params;

  try {
    let relproducto = await RelProducto.findOne({
      where: {
        codigo,
      },
    });
    //si no se encuentra de vuelvo que no se encontro
    if (!relproducto) {
      return res.status(400).json({
        rrors: [
          {
            msg: "No Se Encontro El Producton De Codigo " + codigo,
          },
        ],
      });
    }
    //valido si ya se retiro el producto con dicho codigo
    if (!relproducto.estado) {
      return res.status(400).json({
        rrors: [
          {
            msg: "El Producto Con Codigo " + codigo + " Ya Se Encuentra Retirado",
          },
        ],
      });
    }

    relproducto = await relproducto.update({ estado: false });
    return res.json({
      relproducto,
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

//crea el relproducto (producto uno a uno  y en esta tabla hay uin trigger que realiza el movieminto
// y tambien aumenta las entradas en la tabla producto) en la BD
const CrearRelProducto = async (req = request, res = response) => {
  let { idProducto, cantidad = 1 } = req.params;

  cantidad = parseInt(cantidad);

  const producto = await Producto.findByPk(idProducto);
  if (!producto) {
    return res.status(400).json({
      errors: [
        {
          msg: "El Producto No Existe",
        },
      ],
    });
  }

  if (isNaN(cantidad)) {
    return res.status(400).json({
      errors: [
        {
          msg: "La Cantidad Debe Ser Numerica",
        },
      ],
    });
  }
  const ProductosCreado = [];
  data = {
    estado: true,
    idProducto,
    idusuario: req.usuario.idu,
    codigo: "",
  };
  for (let index = 0; index < cantidad; index++) {
    try {
      let productoC = RelProducto.build(data);
      console.log(productoC);
      productoC = await productoC.save();
      ProductosCreado.push(productoC);
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  res.json({
    ms: ProductosCreado,
  });
};

module.exports = {
  CrearRelProducto,
  getRelProducto,
  getRelproductoU,
  putSalida,
};
