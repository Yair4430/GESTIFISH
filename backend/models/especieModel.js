import db from "../database/db.js";
import { DataTypes } from "sequelize";

const EspecieModel = db.define('especie', {
    Id_Especie: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nom_Especie: { type: DataTypes.STRING(25) },
    Car_Especie: { type: DataTypes.STRING(90) },
    Img_Especie: { type: DataTypes.STRING(250), allowNull: false },
    Tam_Promedio: { type: DataTypes.INTEGER },
    Den_Especie: { type: DataTypes.INTEGER }
}, {
    freezeTableName: true
});

export default EspecieModel;