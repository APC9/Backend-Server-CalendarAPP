/* 
Rutas de Usuarios / auth
host + /api/auth
*/


const  { Router } = require("express");
const { check } = require("express-validator")

const { validarCampos } = require('../middlewares/validarCampos')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarJWT } = require('../middlewares/validarJWT')




const router = Router();
router.post( 
    '/new', 
    [//middlewares
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 Caracteres').isLength({ min:6 }),
        validarCampos
    ],
    crearUsuario 
);

router.post( 
    '/', 
    [
        check('email', 'El email es obligatorio' ).isEmail(),
        check('password', 'El password debe de ser de 6 Caracteres').isLength({ min:6 }),
        validarCampos
    ],
    loginUsuario 
);

// router.use( validarJWT ); Se puede validar varia rutas de esta manera, sin tener que copiarlas en 
// cada una de las rutas, todas las que esten debajo del router.use( validarJWT ); que protegidas

router.get( '/renew', validarJWT, revalidarToken )

module.exports = router;