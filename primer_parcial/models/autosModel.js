import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const autosSchema = new Schema({
    marca: {type: String, required: [true, 'La marca es obligatorio.']},
    modelo: {type: String, required: [true, 'El modelo es obligatorio.']},
    categoriaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categoria',
            required: [true, 'El Id de la categoria es obligatorio'],
            sctrictPopulate: false
        },
    infoPrecio: [{
        precio: {type: Number, required: [true, 'El precio es obligatorio.']},
        tipoCuota: {type: String, required: [true, 'El tipo de couta es obligatorio.']}
    }],
    alicuota: {type: Number, required: [true, 'La alicuota es obligatorio.']},
    img: {type: String, required: [true, 'La imagen es obligatorio.']},
    alt: {type: String, required: [true, 'El ALT es obligatorio.']}
});

const Auto = mongoose.model('auto', autosSchema);

export default Auto;