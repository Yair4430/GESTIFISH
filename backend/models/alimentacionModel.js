import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const AlimentacionModel = db.define('alimentacion', {
  Id_Alimentacion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Fec_Alimentacion: { type: DataTypes.DATEONLY, allowNull: false },
  Can_RacionKg: { type: DataTypes.INTEGER, allowNull: false },
  Id_Siembra: { type: DataTypes.INTEGER, allowNull: false },
  Id_Responsable: { type: DataTypes.INTEGER, allowNull: false },
  Tip_Alimento: { type: DataTypes.ENUM('Concentrado', 'Sal'), allowNull: false },
  Hor_Alimentacion: { type: DataTypes.TIME, allowNull: false },
  Vlr_Alimentacion: { type: DataTypes.INTEGER, allowNull: false }
}, {
  freezeTableName: true,
});

export default AlimentacionModel;