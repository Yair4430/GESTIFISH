import express from 'express';
import { getAllTraslados, getTraslado, createTraslado, updateTraslado, deleteTraslado, getTrasladosByFecha } from '../controllers/trasladoController.js';
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
