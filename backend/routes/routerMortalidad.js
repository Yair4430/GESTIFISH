import express from 'express';
import {
  getAllMortalidad,
  getMortalidadById,
  createMortalidad,
  updateMortalidad,
  deleteMortalidad,
  getMortalidadByFecha
} from '../controllers/mortalidadController.js';
import winston from 'winston';

const routerMortalidad = express.Router();

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ],
});

// Definición de las rutas
routerMortalidad.get('/', getAllMortalidad);
routerMortalidad.get('/:Id_Mortalidad', getMortalidadById);
routerMortalidad.post('/', createMortalidad);
routerMortalidad.put('/:Id_Mortalidad', updateMortalidad);
routerMortalidad.delete('/:Id_Mortalidad', deleteMortalidad);
routerMortalidad.get('/Fec_Mortalidad/:Fec_Mortalidad', getMortalidadByFecha);

// Middleware para manejo de errores
routerMortalidad.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ error: 'An error occurred' });
});

export default routerMortalidad;