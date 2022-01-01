const ingredientCatModel = require("../models/ingredientCat")
const ingredientModel = require("../models/ingredient");

async function getAllIngredientCats() {
    try {
        const res = await ingredientCatModel.getAllIngredientCats()
        return res.rows
    } catch (e) {
        throw e;
    }
}

async function getIngredientCatByID(id) {
    try {
        const res = await ingredientCatModel.getIngredientCatByID(id)
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
        const nomCategorieIngredient = body.nomcategorieingredient;
        const res = await ingredientCatModel.createIngredientCat(nomCategorieIngredient);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteIngredientCat(id) {
    try {
        const res = await ingredientCatModel.deleteIngredientCat(id)
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
        const nomCategorieIngredient = body.nomcategorieingredient;

        const res = await ingredientCatModel.updateIngredientCat(newId,nomCategorieIngredient)
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

async function getAllIngredientByCatIngredient(idCatIngr) {
    try {
        const res = await ingredientCatModel.getAllIngredientByCatIngredient(idCatIngr)
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

module.exports = {
    createIngredientCat,
    updateIngredientCat,
    deleteIngredientCat,
    getAllIngredientCats,
    getIngredientCatByID,
    getAllIngredientByCatIngredient
};
