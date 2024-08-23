import express from 'express';
import { getAllCosecha, getCosechaById, createCosecha, updateCosecha, deleteCosecha, getCosechaByFecha } from '../controllers/cosechaController.js';
import winston from 'winston';

const routerCosecha = express.Router();

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ],
});

// Definición de las rutas
routerCosecha.get('/', getAllCosecha);
routerCosecha.get('/:Id_Cosecha', getCosechaById);
routerCosecha.post('/', createCosecha);
routerCosecha.put('/:Id_Cosecha', updateCosecha);
routerCosecha.delete('/:Id_Cosecha', deleteCosecha);
routerCosecha.get('/Fec_Cosecha/:Fec_Cosecha', getCosechaByFecha);

// Middleware para manejo de errores
routerCosecha.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ error: 'An error occurred' });
});

export default routerCosecha;
