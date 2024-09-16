import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UsuarioModel = db.define('usuario', {
    Id_Usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nom_Usuario: { type: DataTypes.STRING(25), allowNull: false },
    Ape_Usuario: { type: DataTypes.STRING(25), allowNull: false },
    Cor_Usuario: { type: DataTypes.STRING(25), allowNull: false },
    Con_Usuario: { type: DataTypes.STRING(255), allowNull: false },
}, {
    freezeTableName: true,
    timestamps: true // Habilita las columnas createdAt y updatedAt
});

export default UsuarioModel;