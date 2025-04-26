import express from "express";
import {getUsuarios, getUsuarioById, setUsuario, updateUsuarioById, deleteUsuarioById, auth} from "../controllers/usariosManagerController.js";

const router = express.Router();

// Definimos las rutas
router.get('/', getUsuarios);
router.post('/auth', auth);
router.get('/:id', getUsuarioById);
router.post('/', setUsuario);
router.put('/:id', updateUsuarioById);
router.delete('/:id', deleteUsuarioById);


export default router;