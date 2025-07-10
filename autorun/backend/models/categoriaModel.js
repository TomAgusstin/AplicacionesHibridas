import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    titulo: {type: String, required: [true, "El titulo de la categoria es obligatorio."]},
    estado: {type: String, required: [true, "El estado del auto es obligatorio"]}
});

const Categoria = mongoose.model('categoria', categoriaSchema);

export default Categoria;