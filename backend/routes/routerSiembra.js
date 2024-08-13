// Importa las librerías necesarias
import express from "express";
import { 
  createSiembra, 
  deleteSiembra, 
  getAllSiembra, 
  getSiembra, 
  updateSiembra, 
  getQuerySiembra 
} from "../controllers/siembraController.js";
import multer from 'multer';
import path from 'path';
import winston from 'winston';

// Crea una instancia de express.Router
const routerSiembra = express.Router();

// Configura multer para manejar el almacenamiento de archivos (si es necesario)
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
routerSiembra.get('/', getAllSiembra);
routerSiembra.get('/:Id_Siembra', getSiembra);
routerSiembra.post('/', createSiembra); // Puedes usar upload.single('nombreCampo') si necesitas manejar archivos
routerSiembra.put('/:Id_Siembra', updateSiembra); // Igualmente, agrega upload.single('nombreCampo') si es necesario
routerSiembra.delete('/:Id_Siembra', deleteSiembra);
routerSiembra.get('/Id_Siembra/:Id_Siembra', getQuerySiembra);

// Middleware para manejar errores
routerSiembra.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} - ${err.message}`); // Registra el error en el archivo de logs
    res.status(500).json({ error: 'An error occurred' }); // Envía una respuesta genérica al cliente
});

// Exporta el router para usarlo en tu aplicación principal
export default routerSiembra;
