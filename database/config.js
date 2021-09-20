const mongoose = require('mongoose');

const dbConnection = async()=> {

    try {

        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Base de datos');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}


module.exports = {
    dbConnection
}