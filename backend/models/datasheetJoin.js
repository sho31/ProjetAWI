const db = require("../dataBase/index");

/* CRUD */

async function createDatasheetJoin(idFicheTechniqueParent, idFicheTechniqueFille, numEtape) {
    try {
        const res = await db.query(
            "INSERT INTO FicheTechniqueJointure (idFicheTechniqueParent,idFicheTechniqueFille, numEtape) VALUES($1, $2, $3);",
            [idFicheTechniqueParent,idFicheTechniqueFille, numEtape]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function updateDatasheetJoin(idFicheTechniqueParent,idFicheTechniqueFille, numEtape) {
    try {
        const res = await db.query("UPDATE FicheTechniqueJointure SET numetape = $3  WHERE idfichetechniqueparent = $1 AND idfichetechniquefille = $2;",
            [idFicheTechniqueParent,idFicheTechniqueFille, numEtape]);
        return res;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function deleteDatasheetJoin(idFicheTechniqueParent,idFicheTechniqueFille) {
    try {
        const res = await db.query("DELETE FROM FicheTechniqueJointure WHERE idfichetechniqueparent = $1 AND idfichetechniquefille = $2;",
            [idFicheTechniqueParent, idFicheTechniqueFille]);
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllDatasheetJoins() {
    try {
        const res  = await db.query('SELECT * FROM FicheTechniqueJointure;')
        return res;
    } catch (e) {
        throw e;
    }
}

async function getDatasheetJoinByID(idFicheTechniqueParent, idFicheTechniqueFille) {
    try {
        const res = await db.query("SELECT * FROM FicheTechniqueJointure WHERE idfichetechniqueparent = $1 AND idfichetechniquefille = $2;",
            [idFicheTechniqueParent, idFicheTechniqueFille]);
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createDatasheetJoin,
    updateDatasheetJoin,
    deleteDatasheetJoin,
    getAllDatasheetJoins,
    getDatasheetJoinByID,
};
