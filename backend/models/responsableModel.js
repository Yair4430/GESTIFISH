import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ResponsableModel = db.define('responsable', {
    Id_Responsable: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Nom_Responsable: { type: DataTypes.STRING(25) },
    Ape_Responsable: { type: DataTypes.STRING(25) },
    Doc_Responsable: { type: DataTypes.STRING(10) },
    Tip_Responsable: { type: DataTypes.ENUM(['Instructor','Pasante','Instructor a cargo de la Unidad']) },
    Cor_Responsable: { type: DataTypes.STRING(25) },
    Num_Responsable: { type: DataTypes.STRING(10) },
}, {
    freezeTableName: true
})

export default ResponsableModel