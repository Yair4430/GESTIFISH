import express from 'express';
import { createActividad, deleteActividad, getAllActividad, getActividad, updateActividad , getQueryActividad } from "../controllers/actividadController.js";

import winston from 'winston';


const routerActividad = express.Router();


// Configura el logger con winston
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),  
    transports: [
        new winston.transports.File({ filename: 'error.log' }) // Guarda los logs en un archivo llamado 'error.log'
    ],
});

// Rutas para Actividad
routerActividad.get('/', getAllActividad);
routerActividad.get('/:Id_Actividad', getActividad);
routerActividad.post('/', createActividad);
routerActividad.put('/:Id_Actividad', updateActividad);
routerActividad.delete('/:Id_Actividad', deleteActividad);
routerActividad.get('/FechaActividad/:FechaActividad', getQueryActividad);



// Middleware para manejar errores
routerActividad.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} - ${err.message}`); // Registra el error en el archivo de logs
    res.status(500).json({ error: 'An error occurred' }); // Envía una respuesta genérica al cliente
});

export default routerActividad;

