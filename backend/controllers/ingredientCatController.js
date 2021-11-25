const ingredientCat = require("../models/ingredientCat")

async function getAllIngredientCats() {
    try {
        const res = await ingredientCat.getAllIngredientCats()
        return res.rows
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
        const res = await ingredientCat.createIngredientCat(nomCategorieIngredient);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteIngredientCat(id) {
    try {
        const res = await ingredientCat.deleteIngredientCat(id)
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

async function updateIngredientCat(id,body) {
    try {
        const newId = parseInt(id);
        const nomCategorieIngredient = body.nomCategorieIngredient;

        const res = await ingredientCat.updateIngredientCat(newId,nomCategorieIngredient)
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
    createIngredientCat,
    updateIngredientCat,
    deleteIngredientCat,
    getAllIngredientCats,
    getIngredientCatByID
};
