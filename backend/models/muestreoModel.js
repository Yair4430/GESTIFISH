import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const MuestreoModel = db.define('muestreo', {
  Id_Muestreo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Fec_Muestreo: { type: DataTypes.DATEONLY, allowNull: false },
  Num_Peces: { type: DataTypes.INTEGER, allowNull: false },
  Obs_Muestreo: { type: DataTypes.STRING(90), allowNull: false },
  Pes_Esperado: { type: DataTypes.FLOAT, allowNull: false },
  Id_Siembra: { type: DataTypes.INTEGER, allowNull: false },
  Id_Responsable: { type: DataTypes.INTEGER, allowNull: false },
  Hor_Muestreo: { type: DataTypes.TIME, allowNull: false },
  Pes_Promedio: { type: DataTypes.FLOAT, allowNull: false }
}, {

  freezeTableName: true,

});

export default MuestreoModel;
