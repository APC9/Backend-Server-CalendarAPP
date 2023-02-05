const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title:{
        type: String,
        required: true,
    },
    notes:{
        type: String
    },
    start:{
        type: Date,
        required: true,
    },
    end:{
        type: Date,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },

});


// Esto es para que el _id sea id, y eliminar el __V 
EventoSchema.method('toJSON', function (){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Evento', EventoSchema );