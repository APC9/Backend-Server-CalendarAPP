const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config')


// Crear el servidor de express 
const app = express();

//Base de Datos
dbConnection();

// CORS
app.use( cors() )

//Directorio publico
app.use( express.static( 'public' ) );

//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth') );        // Estas son las Rutas de los para las 
app.use('/api/events', require('./routes/events') );    //  peticiones 



//Escuchar peticiones 

const puerto = process.env.PORT;
app.listen( puerto, ()=>{
    console.log(`corriendo en el puerto ${ puerto }`)
})