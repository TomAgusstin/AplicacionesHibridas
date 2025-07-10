import express from 'express';
import {getAutos, getAutosById, addAuto, getAutosByMarca, getRecetasByModelo, updateAutoById, deleteAutoById, getAutosByCategoria} from '../controllers/autosManagerController.js';
import { validacionToken } from "../middleware/auth.js";
import multer from 'multer';
import { uploadController } from '../controllers/uploadController.js';

const router = express.Router();

// Configuramos MULTER

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, '../frontend/public/uploads/')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname )
    }
});

const upload = multer({storage: storage});

// Definimos las routas.
router.get('/', getAutos);
router.post('/', upload.single('img'),addAuto);
router.get('/marca/:marca', getAutosByMarca);
router.get('/:id', validacionToken, getAutosById);
router.get('/modelo/:modelo', getRecetasByModelo);
router.get('/categoria/:categoriaId', getAutosByCategoria);
router.put('/:id', validacionToken, upload.single('img'),updateAutoById);
router.delete('/:id', validacionToken, deleteAutoById);

// router.post('/upload', upload.single('file'), uploadController);

export default router;