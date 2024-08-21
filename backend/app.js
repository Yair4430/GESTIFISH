import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database/db.js';

import routerResponsable from './routes/routerResponsable.js';
import routerEstanque from './routes/routerEstanque.js';
import routerEspecie from './routes/routerEspecie.js';
import routerTraslado from './routes/routerTraslado.js';
import routerAuth from './routes/routerAuth.js';
import routerAlimentacion from './routes/routerAlimentacion.js';
import routerActividad from './routes/routerActividad.js';
import routerSiembra from './routes/routerSiembra.js'; // Importa el router de Siembra
import routerMortalidad from './routes/routerMortalidad.js';
import routerMuestreo from './routes/routerMuestreo.js';

import errorHandler from './middleware/handlerbar.js'; // Ajusta la ruta según tu estructura de archivos
// import { authenticateToken } from './middleware/authMiddleware.js'; // Importa el middleware de autenticación

// Se llama por las llaves foráneas
import ResponsableModel from './models/responsableModel.js';
import ActividadModel from './models/actividadModel.js';
import EstanqueModel from './models/estanqueModel.js';
import TrasladoModel from './models/trasladosModel.js';
import SiembraModel from "./models/siembraModel.js";
import alimentacionModel from "./models/alimentacionModel.js";
import MortalidadModel from './models/mortalidadModel.js';
import MuestreoModel from './models/muestreoModel.js';

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/public/uploads', express.static('public/uploads'));

// Rutas públicas (no requieren autenticación)
app.use('/api', routerAuth);
app.use('/api/auth', routerAuth);
app.use('/auth', routerAuth);


app.use('/alimentacion', routerAlimentacion);
app.use('/responsable', routerResponsable);
app.use('/estanque', routerEstanque);
app.use('/especie', routerEspecie);
app.use('/traslado', routerTraslado);
app.use('/actividad', routerActividad);
app.use('/siembra', routerSiembra); 
app.use('/mortalidad', routerMortalidad);// Añade el router de Siembra
app.use('/muestreo', routerMuestreo);

// Middleware de manejo de errores
app.use(errorHandler);

db.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida.'))
  .catch(err => console.error('Error de conexión a la db:', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Relaciones para Traslado : id_responsable
ResponsableModel.hasMany(TrasladoModel, { foreignKey: "Id_Responsable", as: "responsableTraslado" });
TrasladoModel.belongsTo(ResponsableModel, { foreignKey: "Id_Responsable", as: "responsable" });

// Relaciones para Actiidad : id_responsable and id_estanque
ResponsableModel.hasMany(ActividadModel, { foreignKey: 'Id_Responsable', as: 'actividades' });
ActividadModel.belongsTo(ResponsableModel, { foreignKey: 'Id_Responsable', as: 'responsable' });
EstanqueModel.hasMany(ActividadModel, { foreignKey: 'Id_Estanque', as: 'actividades' });
ActividadModel.belongsTo(EstanqueModel, { foreignKey: 'Id_Estanque', as: 'estanque' });

// Relaciones para Alimentacion : id_responsable and id_siembra 
alimentacionModel.belongsTo(ResponsableModel, { foreignKey: 'Id_Responsable', as: 'responsable' });
alimentacionModel.belongsTo(SiembraModel, { foreignKey: 'Id_Siembra', as: 'siembra' });


// En mortalidadModel.js
MortalidadModel.belongsTo(ResponsableModel, { foreignKey: 'Id_Responsable', as: 'responsable' });
MortalidadModel.belongsTo(SiembraModel, { foreignKey: 'Id_Siembra', as: 'siembra' });

// En muestreoModel.js
MuestreoModel.belongsTo(ResponsableModel, { foreignKey: 'Id_Responsable', as: 'responsable' });
MuestreoModel.belongsTo(SiembraModel, { foreignKey: 'Id_Siembra', as: 'siembra' });

export { TrasladoModel, ResponsableModel, ActividadModel, EstanqueModel, SiembraModel, MuestreoModel};