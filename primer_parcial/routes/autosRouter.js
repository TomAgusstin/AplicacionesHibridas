import express from 'express';
import {getAutos, getAutosById, addAuto, getAutosByMarca, getRecetasByModelo, updateAutoById, deleteAutoById, getAutosByCategoria} from '../controllers/autosManagerController.js';
import { validacionToken } from "../middleware/auth.js";

const router = express.Router();

// Definimos las routas.
router.get('/', getAutos);
router.post('/', addAuto);
router.get('/marca/:marca', getAutosByMarca);
router.get('/:id', validacionToken, getAutosById);
router.get('/modelo/:modelo', getRecetasByModelo);
router.get('/categoria/:categoriaId', getAutosByCategoria);
router.put('/:id', validacionToken, updateAutoById);
router.delete('/:id', validacionToken, deleteAutoById);


export default router;