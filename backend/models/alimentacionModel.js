<<<<<<< HEAD
import db from "../database/db.js";
import { DataTypes } from "sequelize";


const AlimentoModel = db.define('alimentacion',{
    Id_Alimentacion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Fec_Alimentacion: { type: DataTypes.DATEONLY },
    Can_Racion_Kg: { type: DataTypes.STRING(20) },
    Id_Siembra: { type: DataTypes.INTEGER },
    Id_Responsable: { type: DataTypes.INTEGER },
    Tip_Alimento: { type: DataTypes.ENUM('Concentrado', 'Sal') },
    Hor_Alimentacion: { type: DataTypes.STRING(20) },
    Vlr_Alimentacion: { type: DataTypes.STRING(20)},
}, {
    freezeTableName: true,
    timestamps: true
});


=======
import db from "../database/db.js";
import { DataTypes } from "sequelize";


const AlimentoModel = db.define('alimentacion',{
    Id_Alimentacion: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Fec_Alimentacion: { 
        type: DataTypes.DATEONLY 
    },
    Can_Racion_Kg: { 
        type: DataTypes.STRING(20) 
    },
    Id_Siembra: { 
        type: DataTypes.INTEGER 
    },
    Id_Responsable: { 
        type: DataTypes.INTEGER 
    },
    Tip_Alimento: { 
        type: DataTypes.ENUM('Concentrado', 'Sal') 
    },
    Hor_Alimentacion: { 
        type: DataTypes.STRING(20) 
    },
    Vlr_Alimentacion: { 
        type: DataTypes.STRING(20) 
    }
}, {
    freezeTableName: true,
    timestamps: true
});


>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
export default AlimentoModel