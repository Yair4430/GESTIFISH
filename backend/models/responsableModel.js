import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ResponsableModel = db.define('responsable', {
    Id_Responsable: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Nom_Responsable: { 
        type: DataTypes.STRING(80) 
    },
    Ape_Responsable: { 
        type: DataTypes.STRING(80) 
    },
    Doc_Responsable: { 
        type: DataTypes.STRING(14) 
    },
    Tip_Responsable: { 
        type: DataTypes.ENUM('Instructor', 'Pasante', 'Instructor a cargo de la Unidad') 
    },
    Cor_Responsable: { 
        type: DataTypes.STRING(90) 
    },
    Num_Responsable: { 
        type: DataTypes.STRING(12) 
    },
}, {
    freezeTableName: true
});

export default ResponsableModel