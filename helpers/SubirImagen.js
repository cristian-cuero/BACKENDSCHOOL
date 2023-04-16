const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const SubirImagen = async (pictureID = '', picture) => {
  try {

    //Borro La Imagen En Caso De Que Tenga Una
    if (pictureID != '') {
      const nombreArr = pictureID.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [publicID] = nombre.split(".");
      console.log(publicID);
      //pa que no espere lo vaya haciuendo mientras hace lo demas
      cloudinary.uploader.destroy(publicID);
    }

    const  {tempFilePath} = picture
    const {secure_url}= await  cloudinary.uploader.upload(  tempFilePath);
    return  secure_url
  } catch (error) {
    console.log('error :>> ', error);
    return  null
  }
};

module.exports = {
    SubirImagen
}
