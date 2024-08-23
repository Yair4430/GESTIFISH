import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const MortalidadModel = db.define('mortalidad', {
  Id_Mortalidad: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Fec_Mortalidad: { type: DataTypes.DATEONLY, allowNull: false },
  Can_Peces: { type: DataTypes.INTEGER, allowNull: false },
  Mot_Mortalidad: { type: DataTypes.STRING(60), allowNull: false },
  Id_Siembra: { type: DataTypes.INTEGER, allowNull: false },
  Id_Responsable: { type: DataTypes.INTEGER, allowNull: false }
  
}, {

  freezeTableName: true,
});

export default MortalidadModel;
