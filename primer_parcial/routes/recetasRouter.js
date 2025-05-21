import express from 'express';
import {addReceta, getRecetas, getRecetasById, getRecetasByCategoria, getRecetasByAutor, getRecetasByName, deleteRecetaById, updateRecetaById} from '../controllers/recetasManagerController.js';
import { validacionToken } from "../middleware/auth.js";

const router = express.Router();

// Definimos las routas.
router.get('/', getRecetas);
router.post('/', validacionToken, addReceta);
router.get('/titulo/:titulo', getRecetasByName);
router.get('/:id', getRecetasById);
router.get('/autor/:usuarioAlta', getRecetasByAutor);
router.get('/categoria/:categoria', getRecetasByCategoria);
router.put('/:id', validacionToken, updateRecetaById);
router.delete('/:id', validacionToken, deleteRecetaById);


export default router;