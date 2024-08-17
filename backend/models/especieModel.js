import db from "../database/db.js";
import { DataTypes } from "sequelize";

const EspecieModel = db.define('especie', {
    Id_Especie: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nom_Especie: { type: DataTypes.STRING },
    Car_Especie: { type: DataTypes.STRING },
    Img_Especie: { type: DataTypes.STRING, allowNull: false },
    Tam_Promedio: { type: DataTypes.INTEGER },
    Den_Especie: { type: DataTypes.STRING }
}, {
    freezeTableName: true
});

export default EspecieModel;