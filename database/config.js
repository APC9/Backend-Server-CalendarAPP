const mongoose = require('mongoose');

const url = process.env.DB_CNN;

const dbConnection = async ( )=>{

    try {
        
        mongoose.set('strictQuery', false); //Este codigo es para evitar warning 

        await mongoose.connect( url );
        console.log('DB Online')

    } catch (error) {
        console.log( error )
        throw new Error('Error a la hora de inicializar la BD')
    }
}

module.exports = {
    dbConnection
}