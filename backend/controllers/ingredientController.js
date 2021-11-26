const ingredientModel = require("../models/ingredient")

async function getAllIngredients() {
    try {
        const res = await ingredientModel.getAllIngredients()
        return res.rows;
    } catch (e) {
        throw e;
    }
}

async function getIngredientById(id) {
    try {
        const res = await ingredientModel.getIngredientById(id)
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

async function createIngredient(body) {
    try {
        []
        const idCategorieIngredient  = parseInt(body.idCategorieIngredient);
        const idCategorieAllergene  = parseInt(body.idCategorieAllergene);
        const idUnite  = parseInt(body.idUnite);
        const nomIngredient  = body.nomIngredient;
        const prixUnitaireIngredient  = body.prixUnitaireIngredient;
        const stock  = parseInt(body.stock);

        const res = await ingredientModel.createIngredient(idCategorieIngredient,idCategorieAllergene,idUnite,nomIngredient,prixUnitaireIngredient,stock);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteIngredient(id) {
    try {
        const res = await ingredientModel.deleteIngredient(id)
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

async function updateIngredient(id,body) {
    try {
        const newId = parseInt(id);
        const idCategorieIngredient  = parseInt(body.idCategorieIngredient);
        const idCategorieAllergene  = parseInt(body.idCategorieAllergene);
        const idUnite  = parseInt(body.idUnite);
        const nomIngredient  = body.nomIngredient;
        const prixUnitaireIngredient  = body.prixUnitaireIngredient;
        const stock  = parseInt(body.stock)

        const res = await ingredientModel.updateIngredient(newId,idCategorieIngredient,idCategorieAllergene,idUnite,nomIngredient,prixUnitaireIngredient,stock);
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
    createIngredient,
    updateIngredient,
    deleteIngredient,
    getAllIngredients,
    getIngredientById
};
