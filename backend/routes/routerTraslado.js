<<<<<<< HEAD
import express from "express";
import { createTraslado, deleteTraslado, getAllTraslado, getTraslado, updateTraslado } from "../controllers/trasladoController.js";

const router = express.Router();

// Rutas para Traslado
router.get('/traslado', getAllTraslado);
router.get('/traslado/:id', getTraslado);
router.post('/traslado', createTraslado);
router.put('/traslado/:id', updateTraslado);
router.delete('/traslado/:id', deleteTraslado);

export default router;
=======
import express from 'express';
import {
  getAllTraslados,
  getTraslado,
  createTraslado,
  updateTraslado,
  deleteTraslado,
  getTrasladosByFecha
} from '../controllers/trasladoController.js';
import winston from 'winston';

const routerTraslado = express.Router();

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ],
});

routerTraslado.get('/', getAllTraslados);
routerTraslado.get('/:Id_Traslado', getTraslado);
routerTraslado.post('/', createTraslado);
routerTraslado.put('/:Id_Traslado', updateTraslado);
routerTraslado.delete('/:Id_Traslado', deleteTraslado);
routerTraslado.get('/fecha/:fecha', getTrasladosByFecha);

routerTraslado.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ error: 'An error occurred' });
});

export default routerTraslado;
>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
