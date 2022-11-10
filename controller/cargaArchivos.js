const {request , response} = require('express');
const { Producto } = require("../model/Producto");
const { User } = require("../model/user");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);



const  actualizarimagenCloudinary = async(req = require, res = response) => {


    
      
    const {coleccion, id} = req.params
    console.log(coleccion);
    //que cambia o se usa en uan funcion
    let modelo;
    let Pkid ;

    //valido si es un usario o un producto
    switch (coleccion) {
        case 'user':
            modelo = await  User.findByPk(id);
            Pkid = "uid"
            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe el usuario con id ' + id
                })
            }
            break;
            case 'producto':
                modelo = await  Producto.findByPk(id)
                Pkid = "idProductos"
                if(!modelo){
                    return res.status(400).json({
                        msg: 'No existe el producto con id ' + id
                    })
                }
                break;    
    
        default:
        return res.status(500).json({
            msg: 'se me olvido validar esta coleccion ' + coleccion
        })
    }

    //limpia imagenes previas

    try {
        //eliminar imagen de la nube debo traer el id
        if(modelo.imagen){
          const nombreArr = modelo.imagen.split('/'); 
          const nombre = nombreArr[nombreArr.length - 1];
          const [publicID] = nombre.split('.');
          console.log(publicID);
          //pa que no espere lo vaya haciuendo mientras hace lo demas
          cloudinary.uploader.destroy(publicID);

        }
        
    } catch (msg) {
        return res.status(400).json({
            msg
        })
    }

    //agrego la imagen a cloud y referencio el url al servidory lo guardo
    try {


        //subiir a claudinary  usamos el tenporal del file
        const  {tempFilePath} = req.files.archivo
         const {secure_url}= await  cloudinary.uploader.upload(  tempFilePath);
        // const nombre =  await subirArchivo(req.files, undefined, coleccion )
         modelo = await modelo.update({imagen : secure_url},
        {where :{[Pkid]: id}});

     res.json({
        modelo
    }) 
        
    } catch (msg) {
       return res.status(400).json({
            msg:msg
        })
    }

    
}

module.exports = {
    actualizarimagenCloudinary
}