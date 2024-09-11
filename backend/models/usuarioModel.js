import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UsuarioModel = db.define('usuario', {
    Id_Usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nom_Usuario: { type: DataTypes.STRING(50), allowNull: false },
    Ape_Usuario: { type: DataTypes.STRING(50), allowNull: false },
    Cor_Usuario: { type: DataTypes.STRING(100), allowNull: false, unique: true }, // Agregado unique para evitar duplicados
    Con_Usuario: { type: DataTypes.STRING(255), allowNull: false },
}, {
    freezeTableName: true,
    timestamps: true // Habilita las columnas createdAt y updatedAt
});

// Método para comparar contraseñas
UsuarioModel.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.Con_Usuario);
};

// Método para actualizar la contraseña
UsuarioModel.prototype.setPassword = async function(newPassword) {
    this.Con_Usuario = await bcrypt.hash(newPassword, 10);
    await this.save();
};

export default UsuarioModel;
