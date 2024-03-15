const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.mongoURI, {
            //esta todo outdated
            // useNewUrlParser: true,
            // useUnifiedTopology: true
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('Base de datos lanzada');
    } catch (error) {
        console.log(error)
        throw new Error('Error en la conexion con la base de datos')
    }
}


module.exports = {
    dbConnection
}