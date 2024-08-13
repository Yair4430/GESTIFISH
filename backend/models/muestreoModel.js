<<<<<<< HEAD
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const MuestreoModel = db.define('muestreo', {
    Id_Muestreo: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Fec_Muestreo: { 
        type: DataTypes.DATEONLY 
    },
    Num_Peces: { 
        type: DataTypes.INTEGER 
    },
    Obs_Muestreo: { 
        type: DataTypes.STRING(100) 
    },
    Pes_Esperado: { 
        type: DataTypes.STRING(10) 
    },
    Id_Siembra: { 
        type: DataTypes.INTEGER 
    },
    Id_Responsable: { 
        type: DataTypes.INTEGER 
    },
    Hor_Muestreo: { 
        type: DataTypes.STRING(10) 
    },
    Pes_Promedio: { 
        type: DataTypes.STRING(10) 
    }
}, {
    freezeTableName: true
});

=======
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const MuestreoModel = db.define('muestreo', {
    Id_Muestreo: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Fec_Muestreo: { 
        type: DataTypes.DATEONLY 
    },
    Num_Peces: { 
        type: DataTypes.INTEGER 
    },
    Obs_Muestreo: { 
        type: DataTypes.STRING(100) 
    },
    Pes_Esperado: { 
        type: DataTypes.STRING(10) 
    },
    Id_Siembra: { 
        type: DataTypes.INTEGER 
    },
    Id_Responsable: { 
        type: DataTypes.INTEGER 
    },
    Hor_Muestreo: { 
        type: DataTypes.STRING(10) 
    },
    Pes_Promedio: { 
        type: DataTypes.STRING(10) 
    }
}, {
    freezeTableName: true
});

>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
export default MuestreoModel;