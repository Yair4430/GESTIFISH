import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ActividadModel = db.define('actividad', {
    Id_Actividad: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Nom_Actividad: { 
        type: DataTypes.STRING(90) 
    },
    Des_Actividad: { 
        type: DataTypes.STRING(90) 
    },
    Id_Responsable: { 
        type: DataTypes.INTEGER 
    },
    Fec_Actividad: { 
        type: DataTypes.DATEONLY 
    },
    Hor_Actividad: { 
        type: DataTypes.STRING(20) 
    },
    Fas_Produccion: { 
        type: DataTypes.INTEGER 
    },
    Id_Estanque: { 
        type: DataTypes.INTEGER 
    }
}, {
    freezeTableName: true
});

export default ActividadModel;