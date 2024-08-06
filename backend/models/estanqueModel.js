<<<<<<< HEAD
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
=======
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
>>>>>>> 65db394cd671beb8a46b6119eed97cee22344cde
