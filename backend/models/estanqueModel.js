import db from "../database/db.js";
import { DataTypes } from "sequelize";

const EstanqueModel = db.define('estanque', {
    Id_Estanque: { 
        type: DataTypes.INTEGER, 
        primaryKey: true 
    },
    Num_Estanque: { 
        type: DataTypes.INTEGER 
    },
    Esp_Agua: { 
        type: DataTypes.STRING(50) 
    },
    Tip_Estanque: { 
        type: DataTypes.ENUM('Estanque', 'Lago') 
    },
    Lar_Estanque: { 
        type: DataTypes.STRING(20) 
    },
    Anc_Estanque: { 
        type: DataTypes.STRING(20) 
    },
    Des_Estanque: { 
        type: DataTypes.STRING(80) 
    },
    Img_Estanque: { 
        type: DataTypes.STRING(250) 
    },
    Rec_Agua: { 
        type: DataTypes.STRING(30) 
    }
}, {
    freezeTableName: true
});

export default EstanqueModel;