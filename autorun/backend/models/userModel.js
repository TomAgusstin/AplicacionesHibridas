import mongoose from 'mongoose';
import { validarEmail } from '../utils/validaciones.js';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], minlength: [3, 'El nombre debe ser mayor o igual a 3 caracteres.']},
    email: { type: String, required: [true, 'El email es obligatorio']},
    password: { type: String, required: [true, 'La password es obligatorio'], minlength: 8}
});

const User = mongoose.model('user', userSchema);

export default User;