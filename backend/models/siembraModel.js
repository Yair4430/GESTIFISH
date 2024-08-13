import db from "../database/db.js";
import { DataTypes } from "sequelize";

const SiembraModel = db.define('siembra', {
    Id_Siembra: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Can_Peces: { type: DataTypes.INTEGER },
    Fec_Siembra: { type: DataTypes.DATE },
    Fec_PosibleCosecha: { type: DataTypes.DATE },
    Id_Responsable: { type: DataTypes.INTEGER },
    Id_Especie: { type: DataTypes.INTEGER },
    Id_Estanque: { type: DataTypes.INTEGER },
    Pes_Actual: { type: DataTypes.INTEGER },
    Obs_Siembra: { type: DataTypes.STRING(50) },
    Hor_Siembra: { type: DataTypes.TIME },
    Gan_Peso: { type: DataTypes.FLOAT },
    Vlr_Siembra: { type: DataTypes.INTEGER }
}, {
    freezeTableName: true
});

// Asociaciones (Foreign Keys)
SiembraModel.associate = (models) => {
    SiembraModel.belongsTo(models.Responsable, { foreignKey: 'Id_Responsable' });
    SiembraModel.belongsTo(models.Especie, { foreignKey: 'Id_Especie' });
    SiembraModel.belongsTo(models.Estanque, { foreignKey: 'Id_Estanque' });
};

export default SiembraModel;
