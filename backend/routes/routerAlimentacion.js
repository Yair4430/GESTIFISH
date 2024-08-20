import express from 'express';
import {
  getAllAlimentacion,
  getAlimentacionById,
  createAlimentacion,
  updateAlimentacion,
  deleteAlimentacion,
  getAlimentacionByFecha
} from '../controllers/alimentacionController.js';
import winston from 'winston';

const routerAlimentacion = express.Router();

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ],
});

// Definición de las rutas
routerAlimentacion.get('/', getAllAlimentacion);
routerAlimentacion.get('/:Id_Alimentacion', getAlimentacionById);
routerAlimentacion.post('/', createAlimentacion);
routerAlimentacion.put('/:Id_Alimentacion', updateAlimentacion);
routerAlimentacion.delete('/:Id_Alimentacion', deleteAlimentacion);
routerAlimentacion.get('/Fec_Alimentacion/:Fec_Alimentacion', getAlimentacionByFecha);

// Middleware para manejo de errores
routerAlimentacion.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ error: 'An error occurred' });
});

export default routerAlimentacion;
