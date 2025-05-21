import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const puntuacionesSchema = new Schema({
    puntaje: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'El puntaje es obligatorio, debe ser entre 1 y 5.']
    },
    descripcion: String,
    recetaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'receta',
        required: [true, 'El Id de la receta es obligatorio'],
        sctrictPopulate: false
    },
});

const Puntuaciones = mongoose.model('puntuaciones', puntuacionesSchema);

export default Puntuaciones;