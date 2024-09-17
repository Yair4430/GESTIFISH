import db from "../database/db.js";
import { DataTypes } from "sequelize";

const EstanqueModel = db.define('estanque', {
        Id_Estanque: {type: DataTypes.NUMBER, primaryKey:true },
        Nom_Estanque: {type: DataTypes.STRING(25) },
        Esp_Agua: {type: DataTypes.NUMBER },
        Tip_Estanque: {type: DataTypes.ENUM(['Estanque', 'Lago']) },
        Lar_Estanque: {type: DataTypes.NUMBER },
        Anc_Estanque: {type: DataTypes.NUMBER },
        Des_Estanque: {type: DataTypes.STRING(80) },
        Img_Estanque: {type: DataTypes.STRING(250), allowNull: false },
        Rec_Agua: {type: DataTypes.NUMBER }
},{
        freezeTableName: true
})

export default EstanqueModel