const { response } = require('express');
//const bcrypt = require('bcryptjs');


const Evento = require('../models/Evento');


const getEventos = async(  req, resp = response  )=>{

    const eventos = await Evento.find().populate('user', 'name')

    resp.json({
        ok: true,
        eventos
    })

}

const CrearEvento = async(  req, resp = response  )=>{

    const evento = new Evento( req.body )

    try {
        
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        resp.status( 201 ).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        
        console.log( error );

        resp.status( 500 ).json({
            oK: false,
            msg: 'Hable con el administrador de la DB'
        });
    }

}

const actualizarEvento = async(  req, resp = response  )=>{

    const eventoId = req.params.id;
    const uid = req.uid; 

    try {

        const evento = await Evento.findById( eventoId )
        
        if( !evento ){
            return resp.status( 404 ).json({
                ok: false,
                msg: 'Evento no existe por ese ID '
            });
        }

        if( evento.user.toString() !== uid ){
            return resp.status( 401 ).json({
                ok: false,
                msg: 'NO tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento ={
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        resp.json({
            ok: true,
            evento: eventoActualizado
        })


    } catch (error) {
        console.log( error );
        resp.status( 500 ).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const eliminarEvento = async(  req, resp = response  )=>{

    const eventoId = req.params.id;
    const uid = req.uid; 

    try {

        const evento = await Evento.findById( eventoId )
        
        if( !evento ){
            return resp.status( 404 ).json({
                ok: false,
                msg: 'Evento no existe por ese ID '
            });
        }

        if( evento.user.toString() !== uid ){
            return resp.status( 401 ).json({
                ok: false,
                msg: 'NO tiene privilegio de eliminar este evento'
            })
        }

        await Evento.findByIdAndDelete( eventoId )

        resp.json({
            ok: true
        })


    } catch (error) {
        console.log( error );
        resp.status( 500 ).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}


module.exports = {
    getEventos,
    CrearEvento,
    actualizarEvento,
    eliminarEvento
}