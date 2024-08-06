<<<<<<< HEAD
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const MortalidadModel = db.define('mortalidad', {
    Id_Mortalidad: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Fec_Mortalidad: { 
        type: DataTypes.DATEONLY 
    },
    Can_Peces: { 
        type: DataTypes.INTEGER 
    },
    Mot_Mortalidad: { 
        type: DataTypes.STRING(60) 
    },
    Id_Siembra: { 
        type: DataTypes.INTEGER 
    },
    Id_Responsable: { 
        type: DataTypes.INTEGER 
    }
}, {
    freezeTableName: true
});

=======
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const MortalidadModel = db.define('mortalidad', {
    Id_Mortalidad: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Fec_Mortalidad: { 
        type: DataTypes.DATEONLY 
    },
    Can_Peces: { 
        type: DataTypes.INTEGER 
    },
    Mot_Mortalidad: { 
        type: DataTypes.STRING(60) 
    },
    Id_Siembra: { 
        type: DataTypes.INTEGER 
    },
    Id_Responsable: { 
        type: DataTypes.INTEGER 
    }
}, {
    freezeTableName: true
});

>>>>>>> 65db394cd671beb8a46b6119eed97cee22344cde
export default MortalidadModel;