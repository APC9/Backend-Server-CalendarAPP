const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')




const crearUsuario = async( req, resp = response ) =>{

    const { email, password } = req.body; 

    try {
        let usuario = await Usuario.findOne({ email });

        if( usuario ){
            return resp.status( 400 ).json({
                ok:false,
                msg: `Ya existe un usuario con el correo: ${ email }`
            })
        }

        usuario = new Usuario( req.body );

        //Encriptar contraseña 
        const salt = bcrypt.genSaltSync() 
        usuario.password = bcrypt.hashSync( password, salt );

        //Grabar en la BD
        await usuario.save()

        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );
    
        resp.status( 201 ).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log( error )

        resp.status( 500 ).json({
            ok: false,
            msg: 'Por favor pongase en contacto con el administrador de la BD',
        });
        
    }
}



const loginUsuario = async( req, resp = response )=>{

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if( !usuario ){
            return resp.status( 400 ).json({
                ok:false,
                msg: `No existe un usuario con el correo: ${ email }`
            })
        }

        // Confirmar password
        const validPassword = bcrypt.compareSync( password, usuario.password )

        if( !validPassword ){
            return resp.status( 400 ).json({
                ok:false,
                msg: 'Contraseña no Incorrecta'
            })
        }

        //Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );

        resp.status( 200 ).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log( error )

        resp.status( 500 ).json({
            ok: false,
            msg: 'Por favor pongase en contacto con el administrador de la BD',
        });
    }
}





const revalidarToken = async( req, resp = response )=>{

    const { uid, name } = req;

    //Generar nuestro JWT
    const token = await generarJWT( uid, name );

    resp.json({
        ok: true,
        token
    })
}

module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken
}