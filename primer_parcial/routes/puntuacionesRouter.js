import express from "express";
import {getPuntuaciones, getPuntuacionesById, setPuntuaciones, updatePuntuacionesById, deletePuntuacionesById} from "../controllers/puntuacionesManagerController.js";
import { validacionToken } from "../middleware/auth.js";

const router = express.Router();

// Definimos las rutas
router.get('/', getPuntuaciones);
router.get('/:id', validacionToken, getPuntuacionesById);
router.post('/', setPuntuaciones);
router.put('/:id', validacionToken, updatePuntuacionesById);
router.delete('/:id', validacionToken, deletePuntuacionesById);


export default router;