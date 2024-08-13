<<<<<<< HEAD
import express from "express";
import { createEspecie, deleteEspecie, getAllEspecie, getEspecie, updateEspecie } from "../controllers/especieController.js";

const router = express.Router();

// Rutas para Especie
router.get('/especie', getAllEspecie);
router.get('/especie/:id', getEspecie);
router.post('/especie', createEspecie);
router.put('/especie/:id', updateEspecie);
router.delete('/especie/:id', deleteEspecie);

export default router;
=======
// Importa las librerías necesarias
import express from "express";
import { 
  createEspecie, 
  deleteEspecie, 
  getAllEspecies, 
  getEspecie, 
  updateEspecie, 
  getQueryEspecie 
} from "../controllers/especieController.js";
import multer from 'multer';
import path from 'path';
import winston from 'winston';

// Crea una instancia de express.Router
const routerEspecie = express.Router();

// Configura multer para manejar el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Configura el logger con winston
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' }) // Guarda los logs en un archivo llamado 'error.log'
    ],
});

// Define tus rutas
routerEspecie.get('/', getAllEspecies);
routerEspecie.get('/:Id_Especie', getEspecie);
routerEspecie.post('/', upload.single('Img_Especie'), createEspecie);
routerEspecie.put('/:Id_Especie', upload.single('Img_Especie'), updateEspecie);
routerEspecie.delete('/:Id_Especie', deleteEspecie);
routerEspecie.get('/nombre/:Nom_Especie', getQueryEspecie);

// Middleware para manejar errores
routerEspecie.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} - ${err.message}`); // Registra el error en el archivo de logs
    res.status(500).json({ error: 'An error occurred' }); // Envía una respuesta genérica al cliente
});

// Exporta el router para usarlo en tu aplicación principal
export default routerEspecie;
>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
