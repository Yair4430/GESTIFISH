import db from "../database/db.js";
import { DataTypes } from "sequelize";

const EspecieModel = db.define('especie', {
    Id_Especie: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Nom_Especie: { 
        type: DataTypes.STRING(40) 
    },
    Car_Especie: { 
        type: DataTypes.STRING(80) 
    },
    Img_Especie: { 
        type: DataTypes.STRING(250) 
    },
    Tam_Promedio: { 
        type: DataTypes.INTEGER 
    },
    Den_Siembra: { 
        type: DataTypes.STRING(60) 
    }
}, {
    freezeTableName: true
});

export default EspecieModel;