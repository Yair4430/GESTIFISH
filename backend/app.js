import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database/db.js';

import routerResponsable from './routes/routerResponsable.js';
import routerEstanque from './routes/routerEstanque.js';
import routerEspecie from './routes/routerEspecie.js';
import routerTraslado from './routes/routerTraslado.js';
import routerAuth from './routes/routerAuth.js';
import routerAlimento from './routes/routerActividad.js';
import routerActividad from './routes/routerActividad.js';

import errorHandler from './middleware/handlerbar.js'; // Ajusta la ruta según tu estructura de archivos

//Se llama por las laves foraneas
import ResponsableModel from './models/responsableModel.js';
import ActividadModel from './models/actividadModel.js';
import EstanqueModel from './models/estanqueModel.js';
import TrasladoModel from './models/trasladosModel.js';

dotenv.config({ path: './.env'});

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/public/uploads', express.static('public/uploads'));

app.use('/alimentacion', routerAlimento);
app.use('/responsable', routerResponsable); // Verifica esta línea
app.use('/estanque', routerEstanque);
app.use('/especie', routerEspecie)
app.use('/traslado', routerTraslado)
app.use('/actividad', routerActividad)

app.use('/auth', routerAuth)

// Middleware de manejo de errores
app.use(errorHandler);

db.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida.'))
  .catch(err => console.error('Error de conexión a la db:', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Relaciones
ResponsableModel.hasMany(TrasladoModel,{foreignKey:"Id_Responsable", as : "responsableTraslado"})
TrasladoModel.belongsTo(ResponsableModel,{foreignKey:"Id_Responsable" ,as : "responsable"})

ResponsableModel.hasMany(ActividadModel, { foreignKey: 'Id_Responsable', as: 'actividades' });
ActividadModel.belongsTo(ResponsableModel, { foreignKey: 'Id_Responsable', as: 'responsable' });

EstanqueModel.hasMany(ActividadModel, { foreignKey: 'Id_Estanque', as: 'actividades' });
ActividadModel.belongsTo(EstanqueModel, { foreignKey: 'Id_Estanque', as: 'estanque' });

//Exportacion de los modelos con las relaciones ya establecidas
export {TrasladoModel, ResponsableModel, ActividadModel, EstanqueModel } 