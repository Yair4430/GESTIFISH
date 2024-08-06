import db from "../database/db.js";
import { DataTypes } from "sequelize";

const CosechaModel = db.define('cosecha', {
    Id_Cosecha: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Fec_Cosecha: { 
        type: DataTypes.DATEONLY 
    },
    Can_Peces: { 
        type: DataTypes.INTEGER 
    },
    Pes_Eviscerado: { 
        type: DataTypes.STRING(10) 
    },
    Pes_Viscerado: { 
        type: DataTypes.STRING(10) 
    },
    Por_Visceras: { 
        type: DataTypes.STRING(10) 
    },
    Id_Responsable: { 
        type: DataTypes.INTEGER 
    },
    Id_Siembra: { 
        type: DataTypes.INTEGER 
    },
    Hor_Cosecha: { 
        type: DataTypes.STRING(10) 
    },
    Vlr_Cosecha: { 
        type: DataTypes.STRING(10) 
    },
    Obs_Cosecha: { 
        type: DataTypes.STRING(80) 
    }
}, {
    freezeTableName: true
});

export default CosechaModel;