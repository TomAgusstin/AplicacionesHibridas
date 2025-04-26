import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const recetaSchema = new Schema({
    titulo: String,
    categoria: String,
    ingredientes: [{
        nombre: String,
        cantidad: String
    }],
    instrucciones: [String],
    usuarioAlta: String
});

const Receta = mongoose.model('receta', recetaSchema);

export default Receta;