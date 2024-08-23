import express from 'express';
import { getAllSiembra, getSiembra, createSiembra, updateSiembra, deleteSiembra, getSiembraByFechaInicio } from '../controllers/siembraController.js';
import winston from 'winston';

const routerSiembra = express.Router();

// Configuración del logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ],
});

// Definición de las rutas
routerSiembra.get('/', getAllSiembra);
routerSiembra.get('/Fec_Siembra/:Fec_Siembra', getSiembraByFechaInicio);  // Ruta para consultar por fecha
routerSiembra.get('/:Id_Siembra', getSiembra);
routerSiembra.post('/', createSiembra);
routerSiembra.put('/:Id_Siembra', updateSiembra);
routerSiembra.delete('/:Id_Siembra', deleteSiembra);

// Middleware para manejo de errores
routerSiembra.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ error: 'An error occurred' });
});

export default routerSiembra;
