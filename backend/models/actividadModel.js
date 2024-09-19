import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const ActividadModel = db.define('actividad', {
  
  Id_Actividad: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
  Nom_Actividad: DataTypes.STRING(25),
  Des_Actividad: DataTypes.STRING(90),
  Id_Responsable: DataTypes.INTEGER,
  Fec_Actividad: DataTypes.DATE,
  Hor_Actividad: DataTypes.TIME,
  Fas_Produccion: DataTypes.ENUM(['Antes de la cosecha', 'Despues de la cosecha']),
  Id_Estanque: DataTypes.INTEGER,
}, {
  freezeTableName: true,
  timestamps: false
});

export default ActividadModel;