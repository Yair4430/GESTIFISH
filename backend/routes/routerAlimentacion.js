// routerAlimentacion.js
import express from "express";
import { createAlimento, deleteAlimento, getAllAlimento, getAlimento, updateAlimento, getQueryAlimento } from "../controllers/alimentacionController.js";
import winston from 'winston';

const routerAlimentacion = express.Router();

// Configura el logger con winston
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' }) // Guarda los logs en un archivo llamado 'error.log'
    ],
});

// Rutas para Alimentacion
routerAlimentacion.get('/', getAllAlimento);
routerAlimentacion.get('/:Id_Alimentacion', getAlimento);
routerAlimentacion.post('/', createAlimento);
routerAlimentacion.put('/:Id_Alimentacion', updateAlimento);
routerAlimentacion.delete('/:Id_Alimentacion', deleteAlimento);
routerAlimentacion.get('/Fec_Alimentacion/:Fec_Alimentacion', getQueryAlimento);

// Middleware para manejar errores
routerAlimentacion.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} - ${err.message}`); // Registra el error en el archivo de logs
    res.status(500).json({ error: 'An error occurred' }); // Envía una respuesta genérica al cliente
});

export default routerAlimentacion;
