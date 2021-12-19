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
        const res = await db.query("SELECT idetape,numetape,titreetape,descriptionetape,tempsetape,idingredient,nomingredient,quantite,nomunite FROM ingredientetapejointure NATURAL Join etape NATURAL Join ingredient Natural Join unite where idEtape = $1;",
            [idEtape]);
        return res;
    } catch (e) {
        throw e;
    }
}

async function getIngredientStepJoinByDataSheetID(idDataSheet,idCatIngredient) {
    try {
        const res = await db.query("SELECT idingredient,nomingredient,Sum(quantite) FROM ingredientetapejointure NATURAL Join etape NATURAL Join ingredient Natural Join unite where idfichetechnique = $1 AND idcategorieingredient= $2 GROUP BY idingredient, nomingredient;",
            [idDataSheet,idCatIngredient]);
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllergenCatListStepId(idFicheTechnique) {
    try {
        const res = await db.query("SELECT DISTINCT idcategorieallergene,categorieallergene FROM ingredientetapejointure NATURAL Join etape NATURAL Join ingredient NATURAL Join categorieallergene where idfichetechnique = $1 ORDER BY categorieallergene;",
            [idFicheTechnique]);
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllergenListByCatAndStepId(idFicheTechnique,idCatAllergene) {
    try {
        const res = await db.query("SELECT DISTINCT nomingredient,idingredient FROM ingredientetapejointure NATURAL JOIN etape NATURAL JOIN ingredient NATURAL JOIN categorieallergene where idfichetechnique = $1 AND idcategorieallergene=$2 ORDER BY nomingredient;",
            [idFicheTechnique,idCatAllergene]);
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
    getAllergenCatListStepId,
    getAllergenListByCatAndStepId,
    getIngredientStepJoinByDataSheetID,
};
