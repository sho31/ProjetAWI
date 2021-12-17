const db = require("../dataBase/index");

/* CRUD */

async function createIngredientStepJoin(idFicheTechniqueParent, idFicheTechniqueFille, numEtape) {
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

async function updateIngredientStepJoin(idFicheTechniqueParent,idFicheTechniqueFille, numEtape) {
    try {
        const res = await db.query("UPDATE FicheTechniqueJointure SET numetape = $3  WHERE idfichetechniqueparent = $1 AND idfichetechniquefille = $2;",
            [idFicheTechniqueParent,idFicheTechniqueFille, numEtape]);
        return res;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function deleteIngredientStepJoin(idFicheTechniqueParent,idFicheTechniqueFille) {
    try {
        const res = await db.query("DELETE FROM FicheTechniqueJointure WHERE idfichetechniqueparent = $1 AND idfichetechniquefille = $2;",
            [idFicheTechniqueParent, idFicheTechniqueFille]);
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllIngredientStepJoin() {
    try {
        const res  = await db.query('SELECT * FROM ingredientetapejointure;')
        return res;
    } catch (e) {
        throw e;
    }
}

async function getIngredientStepJoinByStepId(idEtape) {
    try {
        const res = await db.query("SELECT idetape,numetape,titreetape,descriptionetape,tempsetape,nomingredient,quantite,nomunite FROM ingredientetapejointure NATURAL Join etape NATURAL Join ingredient Natural Join unite where idEtape = $1;",
            [idEtape]);
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createIngredientStepJoin,
    updateIngredientStepJoin,
    deleteIngredientStepJoin,
    getAllIngredientStepJoin,
    getIngredientStepJoinByStepId,
};
