//modelo del servidor

const expres = require("express");

const cors = require("cors");
const { dbConnections } = require("../database/db");

const fileUpload = require('express-fileupload')

class Server {
  //constructor
  constructor() {
    this.app = expres();
    this.port = 8080;

    //paths de rutas
    this.paths = {
      usuarios: "/api/users",
      login: "/api/login",
      tenat: "/api/tenat"
    };

    this.middleware();
    //rutas de la aplicacion
    this.routes();
    this.conectarDD();
  }

  //para que escuche
  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Backend corriendo en http://localhost:${process.env.PORT}`);
    });
  }

  async conectarDD() {
    await dbConnections();
  }
  //middlewares de mi app
  middleware() {
    // uso de cors
    this.app.use(cors());
    //lectura y pareson de json
    this.app.use(expres.json());
    //acepta archiva desde peticiones rest es una configuracion
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true, //mucho cuidado que esto crea carpeta donde sea
      })
    );
  }

  //importar Rutas
  routes() {
    this.app.use(this.paths.usuarios, require("../routes/users"));
    this.app.use(this.paths.login, require("../routes/auth"));
    this.app.use(this.paths.tenat, require("../routes/tenat"));
  }
}
//exportar
module.exports = Server;
