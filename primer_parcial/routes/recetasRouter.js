import express from 'express';
import {addReceta, getRecetas, getRecetasByName, updateRecetaByName, deleteRecetaByName} from '../controllers/recetasManagerController.js';

const router = express.Router();

// Definimos las routas.
router.get('/', getRecetas);
router.post('/', addReceta);
router.get('/:titulo', getRecetasByName);
router.put('/:titulo', updateRecetaByName);
router.delete('/:titulo', deleteRecetaByName);


export default router;