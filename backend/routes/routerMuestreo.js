import express from 'express';
import {
  getAllMuestreo,
  getMuestreoById,
  createMuestreo,
  updateMuestreo,
  deleteMuestreo,
  getMuestreoByFecha
} from '../controllers/muestreoController.js';
import winston from 'winston';

const routerMuestreo = express.Router();

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ],
});

// Definición de las rutas
routerMuestreo.get('/', getAllMuestreo);
routerMuestreo.get('/:Id_Muestreo', getMuestreoById);
routerMuestreo.post('/', createMuestreo);
routerMuestreo.put('/:Id_Muestreo', updateMuestreo);
routerMuestreo.delete('/:Id_Muestreo', deleteMuestreo);
routerMuestreo.get('/Fec_Muestreo/:Fec_Muestreo', getMuestreoByFecha);

// Middleware para manejo de errores
routerMuestreo.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ error: 'An error occurred' });
});

export default routerMuestreo;