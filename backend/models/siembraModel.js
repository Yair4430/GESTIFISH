<<<<<<< HEAD
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const SiembraModel = db.define('siembra', {
    Id_Siembra: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Can_Peces: { 
        type: DataTypes.INTEGER 
    },
    Fec_Siembra: { 
        type: DataTypes.DATEONLY 
    },
    Fec_PosibleCosecha: { 
        type: DataTypes.DATEONLY 
    },
    Id_Responsable: { 
        type: DataTypes.INTEGER 
    },
    Id_Especie: { 
        type: DataTypes.INTEGER 
    },
    Id_Estanque: { 
        type: DataTypes.INTEGER 
    },
    Pes_Actual: { 
        type: DataTypes.INTEGER 
    },
    Obs_Siembra: { 
        type: DataTypes.STRING(50) 
    },
    Hor_Siembra: { 
        type: DataTypes.TIME 
    },
    Gan_Peso: { 
        type: DataTypes.FLOAT 
    },
    Vlr_Siembra: { 
        type: DataTypes.INTEGER 
    }
}, {
    freezeTableName: true
});

=======
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const SiembraModel = db.define('siembra', {
    Id_Siembra: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Can_Peces: { 
        type: DataTypes.INTEGER 
    },
    Fec_Siembra: { 
        type: DataTypes.DATEONLY 
    },
    Fec_PosibleCosecha: { 
        type: DataTypes.DATEONLY 
    },
    Id_Responsable: { 
        type: DataTypes.INTEGER 
    },
    Id_Especie: { 
        type: DataTypes.INTEGER 
    },
    Id_Estanque: { 
        type: DataTypes.INTEGER 
    },
    Pes_Actual: { 
        type: DataTypes.INTEGER 
    },
    Obs_Siembra: { 
        type: DataTypes.STRING(50) 
    },
    Hor_Siembra: { 
        type: DataTypes.TIME 
    },
    Gan_Peso: { 
        type: DataTypes.FLOAT 
    },
    Vlr_Siembra: { 
        type: DataTypes.INTEGER 
    }
}, {
    freezeTableName: true
});

>>>>>>> 65db394cd671beb8a46b6119eed97cee22344cde
export default SiembraModel;