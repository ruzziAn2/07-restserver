const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios'
        this.authPath = '/api/auth'

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

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'))
        this.app.use(this.usuarioPath, require('../routes/user.routes'))


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en', this.port)
        })
    }

}


module.exports = Server;