const ingredientCat = require("../models/ingredientCat")

async function getAllIngredientCats() {
    try {
        return await ingredientCat.getAllIngredientCats()
    } catch (e) {
        throw e;
    }
}

async function getIngredientCatByID(id) {
    try {
        const res = await ingredientCat.getIngredientCatByID(id)
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

async function createIngredientCat(body) {
    try {
        const nomCategorieIngredient = body.nomCategorieIngredient;
        return await ingredientCat.createIngredientCat(nomCategorieIngredient);
    } catch (e) {
        throw e;
    }
}

async function deleteIngredientCat(id) {
    try {
        return  await ingredientCat.deleteIngredientCat(id)
    } catch (e) {
        throw e;
    }
}

async function updateIngredientCat(id,body) {
    try {
        var newId = parseInt(id);
        const prenomAuteur  = body.prenomAuteur;
        const nomAuteur = body.nomAuteur;
        return await ingredientCat.updateIngredientCat(newId,prenomAuteur,nomAuteur)
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createIngredientCat,
    updateIngredientCat,
    deleteIngredientCat,
    getAllIngredientCats,
    getIngredientCatByID
};
