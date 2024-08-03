import db from "../database/db.js";
import { DataTypes } from "sequelize";

const TrasladoModel = db.define('traslados', {
    Id_Traslado: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Fec_Traslado: { 
        type: DataTypes.DATEONLY 
    },
    Can_Peces: { 
        type: DataTypes.INTEGER 
    },
    Id_Responsable: { 
        type: DataTypes.INTEGER 
    },
    Obs_Traslado: { 
        type: DataTypes.STRING(50) 
    },
    Hor_Traslado: { 
        type: DataTypes.TIME 
    }
}, {
    freezeTableName: true
});

export default TrasladoModel;