const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            cargar: '/api/cargar',
            clasificaciones: '/api/clasificaciones',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }

        //Conectar a base de datos
        this.connectDB()
        //Middlewares
        this.middlewares()
        //Rutas de mi aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //lectura y conversion del body
        this.app.use(express.json())
        //Directorio publico
        this.app.use(express.static("public"))
        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.buscar, require('../routes/find.routes'));
        this.app.use(this.paths.cargar, require('../routes/uploads.routes'));
        this.app.use(this.paths.clasificaciones, require('../routes/classifications.routes'));
        this.app.use(this.paths.productos, require('../routes/products.routes'));
        this.app.use(this.paths.usuarios, require('../routes/users.routes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en', this.port)
        })
    }

}


module.exports = Server;