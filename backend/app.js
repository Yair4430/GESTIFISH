import express, { Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import db from './database/db.js'
import AlimentoRoutes from './routes/routerAlimentacion.js'
import routerResponsable from './routes/routerResponsable.js'
import routerEstanque from './routes/routerEstanque.js';

import errorHandler from './middleware/handlerbar.js'; // Ajusta la ruta según tu estructura de archivos

const app = express()
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());
app.use('/public/uploads', express.static('public/uploads'));

app.use('/alimentacion', AlimentoRoutes)
app.use('/responsable', routerResponsable)
app.use('/estanque', routerEstanque);
// Middleware de manejo de errores
app.use(errorHandler);

db.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida.'))
  .catch(err => console.error('Error de conexión a la db:', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})


