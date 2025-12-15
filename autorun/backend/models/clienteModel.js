import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], minlength: [3, 'El nombre debe ser mayor o igual a 3 caracteres.']},
    apellido: { type: String, required: [true, 'El apellido es obligatorio'], minlength: [3, 'El apellido debe ser mayor o igual a 3 caracteres.']},
    dni: { type: Number, required: [true, 'El DNI es obligatorio'], minlength: [9, 'El DNI debe contener minimo 9 caracteres.'], maxlength: [9, 'El DNI debe contener 9 caracteres.']},
    email: { type: String, required: [true, 'El email es obligatorio']},
    celular: { type: Number, required: [true, 'El celular es obligatorio']}
});

const Cliente = mongoose.model('cliente', userSchema);

export default Cliente;