// Importa las librerías necesarias
import express from "express";
import { 
  createEstanque, 
  deleteEstanque, 
  getAllEstanque, 
  getEstanque, 
  updateEstanque, 
  getQueryEstanque 
} from "../controllers/estanqueController.js";
import multer from 'multer';
import path from 'path';
import winston from 'winston';

// Crea una instancia de express.Router
const routerEstanque = express.Router();

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
routerEstanque.get('/', getAllEstanque);
routerEstanque.get('/:Id_Estanque', getEstanque);
routerEstanque.post('/', upload.single('Img_Estanque'), createEstanque);
routerEstanque.put('/:Id_Estanque', upload.single('Img_Estanque'), updateEstanque);
routerEstanque.delete('/:Id_Estanque', deleteEstanque);
routerEstanque.get('/Id_Estanque/:Id_Estanque', getQueryEstanque);

// Middleware para manejar errores
routerEstanque.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} - ${err.message}`); // Registra el error en el archivo de logs
    res.status(500).json({ error: 'An error occurred' }); // Envía una respuesta genérica al cliente
});

// Exporta el router para usarlo en tu aplicación principal
export default routerEstanque;
