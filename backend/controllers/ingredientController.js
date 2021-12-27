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
        const idCategorieIngredient  = parseInt(body.idcategorieingredient);
        const idCategorieAllergene  = parseInt(body.idcategorieallergene);
        const idUnite  = parseInt(body.idunite);
        const nomIngredient  = body.nomingredient;
        const prixUnitaireIngredient  = body.prixunitaireingredient;
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
        const idCategorieIngredient  = parseInt(body.idcategorieingredient) ;
        const idCategorieAllergene  = parseInt(body.idcategorieallergene) ;
        const idUnite  = parseInt(body.idunite);
        const nomIngredient  = body.nomingredient;
        const prixUnitaireIngredient  = body.prixunitaireingredient;
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

async function updateStockIngredient(id,quantite) {
    try {
        const newId = parseInt(id);
        const stockToRemove  = parseInt(quantite);

        const currentStock = await ingredientModel.getIngredientStock(id);

        const res = await ingredientModel.updateStockIngredient(newId,currentStock-stockToRemove);
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
    getIngredientById,
    updateStockIngredient,
};
