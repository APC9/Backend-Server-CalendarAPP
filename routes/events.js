/* 
    Rutas de Usuarios / auth
    host + /api/events
*/


const  { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require('../middlewares/validarCampos')
const { validarJWT } = require('../middlewares/validarJWT')
const { getEventos, CrearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");


const router = Router();

//Con este linea de codigo se validan todos los los endpoints con el JWT sin tener que copiar 
// la funcion en cada una de las peticiones
router.use( validarJWT );

//Obtener Eventos
router.get( '/',  getEventos );

//Crear Eventos
router.post( 
    '/', 
    [
        check('title', 'El titulo es Obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es Obligatorio').custom( isDate ),
        check('end', 'Fecha de finalizacion es Obligatorio').custom( isDate ),
        validarCampos
    ],
    CrearEvento 
);

//Actualizar Eventos
router.put( '/:id', actualizarEvento );

//Borrar Eventos
router.delete( '/:id', eliminarEvento );


module.exports = router; // exportar el router por que las rutas lo requieren 
