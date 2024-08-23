import express from "express";
import { createResponsable, deleteResponsable, getAllResponsable, getResponsable, updateResponsable, getQueryResponsable } from "../controllers/responsableController.js";
import winston from 'winston';

// Crea una instancia de express.Router
const routerResponsable = express.Router();

// Configura el logger con winston
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' }) // Guarda los logs en un archivo llamado 'error.log'
    ],
});

// Define tus rutas
routerResponsable.get('/', getAllResponsable);
routerResponsable.get('/:Id_Responsable', getResponsable);
routerResponsable.post('/', createResponsable);
routerResponsable.put('/:Id_Responsable', updateResponsable);
routerResponsable.delete('/:Id_Responsable', deleteResponsable);
routerResponsable.get('/Doc_Responsable/:Doc_Responsable', getQueryResponsable);

// Middleware para manejar errores
routerResponsable.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} - ${err.message}`); // Registra el error en el archivo de logs
    res.status(500).json({ error: 'An error occurred' }); // Envía una respuesta genérica al cliente
});

// Exporta el router para usarlo en tu aplicación principal
export default routerResponsable;
