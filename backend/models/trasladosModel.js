<<<<<<< HEAD
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

=======
import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import ResponsableModel from './responsableModel.js';

const TrasladoModel = db.define('traslados', {
    Id_Traslado: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Fec_Traslado: {type: DataTypes.DATEONLY, allowNull: false },
    Can_Peces: {type: DataTypes.INTEGER, allowNull: false},
    Id_Responsable: {type: DataTypes.INTEGER,
        references: {
            model: ResponsableModel,
            key: "Id_Responsable"
        },
    },      
    Obs_Traslado: {type: DataTypes.STRING(50),allowNull: true},
    Hor_Traslado: {type: DataTypes.TIME,allowNull: false}

}, {
    freezeTableName: true,
    
});

>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
export default TrasladoModel;