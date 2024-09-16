import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const CosechaModel = db.define('cosecha', {
  Id_Cosecha: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Fec_Cosecha: { type: DataTypes.DATEONLY, allowNull: false },
  Can_Peces: { type: DataTypes.INTEGER, allowNull: false },
  Pes_Eviscerado: { type: DataTypes.INTEGER, allowNull: false },
  Pes_Viscerado: { type: DataTypes.INTEGER, allowNull: false },
  Por_Visceras: { type: DataTypes.INTEGER, allowNull: false },
  Id_Responsable: { type: DataTypes.INTEGER, allowNull: false },
  Id_Siembra: { type: DataTypes.INTEGER, allowNull: false },
  Hor_Cosecha: { type: DataTypes.TIME, allowNull: false },
  Vlr_Cosecha: { type: DataTypes.INTEGER, allowNull: false },
  Obs_Cosecha: { type: DataTypes.STRING(90), allowNull: true }

}, {
    
  freezeTableName: true,

});

export default CosechaModel;