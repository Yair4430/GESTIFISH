<<<<<<< HEAD
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ResponsableModel = db.define('responsable', {
    Id_Responsable: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Nom_Responsable: { type: DataTypes.STRING },
    Ape_Responsable: { type: DataTypes.STRING },
    Doc_Responsable: { type: DataTypes.STRING },
    Tip_Responsable: { type: DataTypes.CHAR },
    Cor_Responsable: { type: DataTypes.STRING },
    Num_Responsable: { type: DataTypes.STRING },
}, {
    freezeTableName: true
})

=======
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ResponsableModel = db.define('responsable', {
    Id_Responsable: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Nom_Responsable: { type: DataTypes.STRING },
    Ape_Responsable: { type: DataTypes.STRING },
    Doc_Responsable: { type: DataTypes.STRING },
    Tip_Responsable: { type: DataTypes.CHAR },
    Cor_Responsable: { type: DataTypes.STRING },
    Num_Responsable: { type: DataTypes.STRING },
}, {
    freezeTableName: true
})

>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
export default ResponsableModel