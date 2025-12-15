import express from 'express';
import {addPlan, getPlanByIdCliente, getPlanes} from '../controllers/planClienteManagerController.js';
import { validacionToken } from "../middleware/auth.js";

const router = express.Router();

// Definimos las routas.
router.get('/', validacionToken, getPlanes);
router.post('/', validacionToken, addPlan);
router.get('/:id', validacionToken, getPlanByIdCliente);
// router.delete('/:id', validacionToken, deleteAutoById);

// router.post('/upload', upload.single('file'), uploadController);

export default router;