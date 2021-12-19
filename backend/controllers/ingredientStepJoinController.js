const IngredientStepJoinModel = require("../models/ingredientStepjoin")

async function getAllIngredientStepJoins() {
    try {
        const res = await IngredientStepJoinModel.getAllIngredientStepJoin()
        return res.rows;
    } catch (e) {
        throw e;
    }
}

async function getIngredientStepJoinByStepId(idEtape) {
    try {
        const res = await IngredientStepJoinModel.getIngredientStepJoinByStepId(idEtape)
        if (res !== null) {
            if (res.rowCount > 0) {
                return res.rows;
            }
        }
        return null;
    } catch (e) {
        throw e;
    }
}

async function getAllergenCatListStepId(idFicheTechnique) {
    try {
        const res = await IngredientStepJoinModel.getAllergenCatListStepId(idFicheTechnique)
        if (res !== null) {
            if (res.rowCount > 0) {
                return res.rows;
            }
        }
        return null;
    } catch (e) {
        throw e;
    }
}

async function getAllergenListByCatAndStepId(idFicheTechnique,idCatAllergene) {
    try {
        const res = await IngredientStepJoinModel.getAllergenListByCatAndStepId(idFicheTechnique,idCatAllergene)
        if (res !== null) {
            if (res.rowCount > 0) {
                return res.rows;
            }
        }
        return null;
    } catch (e) {
        throw e;
    }
}

async function getIngredientStepJoinByDataSheetID(idFicheTechnique,idCatIngredient) {
    try {
        const res = await IngredientStepJoinModel.getIngredientStepJoinByDataSheetID(idFicheTechnique,idCatIngredient)
        if (res !== null) {
            if (res.rowCount > 0) {
                return res.rows;
            }
        }
        return null;
    } catch (e) {
        throw e;
    }
}

async function createIngredientStepJoin(body) {
    try {
        const idEtape = body.idetape;
        const idIngredient = body.idingredient;
        const quantite = body.quantite;

        const res = await IngredientStepJoinModel.createIngredientStepJoin(idEtape,idIngredient, quantite);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteIngredientStepJoin(idEtape, idIngredient) {
    try {
        const res = await IngredientStepJoinModel.deleteIngredientStepJoin(idEtape, idIngredient)
        if (res !== null) {
            if (res.rowCount > 0) {
                return res;
            }
        }
        return null;
    } catch (e) {
        throw e;
    }
}
//It is only possible to change numEtape, otherwise delete
async function updateIngredientStepJoin(idetape, idingredient, body) {
    try {

        const newQuantite = body.quantite;
        const res = await IngredientStepJoinModel.updateIngredientStepJoin(idetape,idingredient, newQuantite)
        if (res !== null) {
            if (res.rowCount > 0) {
                return res;
            }
        }
        return null;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createIngredientStepJoin,
    updateIngredientStepJoin,
    deleteIngredientStepJoin,
    getAllIngredientStepJoins,
    getIngredientStepJoinByStepId,
    getAllergenCatListStepId,
    getAllergenListByCatAndStepId,
    getIngredientStepJoinByDataSheetID,
};
