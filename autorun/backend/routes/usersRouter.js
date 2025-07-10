import express from "express";
import {getUsuarios, getUsuarioById, setUsuario, updateUsuarioById, deleteUsuarioById, auth} from "../controllers/usariosManagerController.js";
import { validacionToken } from "../middleware/auth.js";

const router = express.Router();

// Definimos las rutas
router.get('/', validacionToken, getUsuarios);
router.post('/auth', auth);
router.get('/:id', validacionToken, getUsuarioById);
router.post('/', setUsuario);
router.put('/:id', validacionToken, updateUsuarioById);
router.delete('/:id', validacionToken, deleteUsuarioById);


export default router;