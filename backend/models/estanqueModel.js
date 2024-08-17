import db from "../database/db.js";
import { DataTypes } from "sequelize";

const EstanqueModel = db.define('estanque', {
        Id_Estanque: {type: DataTypes.NUMBER, primaryKey:true },
        Nom_Estanque: {type: DataTypes.STRING },
        Esp_Agua: {type: DataTypes.NUMBER },
        Tip_Estanque: {type: DataTypes.CHAR },
        Lar_Estanque: {type: DataTypes.NUMBER },
        Anc_Estanque: {type: DataTypes.NUMBER },
        Des_Estanque: {type: DataTypes.STRING },
        Img_Estanque: {type: DataTypes.STRING, allowNull: false },
        Rec_Agua: {type: DataTypes.NUMBER }
},{
        freezeTableName: true
})

export default EstanqueModel
