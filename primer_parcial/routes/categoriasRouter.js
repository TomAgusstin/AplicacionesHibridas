import express from "express";
import {getCategoriaById, getCategorias, deleteCategoriaById, setCategoria, updateCategoriaById} from "../controllers/categoriaManagerController.js";
import { validacionToken } from "../middleware/auth.js";

const router = express.Router();

// Definimos las rutas
router.get('/', getCategorias);
router.get('/:id', validacionToken, getCategoriaById);
router.post('/', setCategoria);
router.put('/:id', validacionToken, updateCategoriaById);
router.delete('/:id', validacionToken, deleteCategoriaById);


export default router;