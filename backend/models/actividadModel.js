// models/actividadModel.js
import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const ActividadModel = db.define('actividad', {
  
  Id_Actividad: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
  Nom_Actividad: DataTypes.STRING,
  Des_Actividad: DataTypes.STRING,
  Id_Responsable: DataTypes.INTEGER,
  Fec_Actividad: DataTypes.DATE,
  Hor_Actividad: DataTypes.TIME,
  Fas_Produccion: DataTypes.STRING,
  Id_Estanque: DataTypes.INTEGER,
}, {
  timestamps: false,
  freezeTableName: true,
});

export default ActividadModel;
