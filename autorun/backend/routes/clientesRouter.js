import express from "express";
import {getClientes, getClienteById, setCliente, updateClienteById, deleteClienteById} from "../controllers/clientesManagerController.js";
import { validacionToken } from "../middleware/auth.js";

const router = express.Router();

// Definimos las rutas
router.get('/', validacionToken, getClientes);
router.get('/:id', validacionToken, getClienteById);
router.post('/', validacionToken, setCliente);
router.put('/:id', validacionToken, updateClienteById);
router.delete('/:id', validacionToken, deleteClienteById);


export default router;