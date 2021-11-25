const allergenCatModel = require("../models/allergenCat")

async function getAllAllergenCats() {
    try {
        const res = await allergenCatModel.getAllAllergenCats()
        return res.rows
    } catch (e) {
        throw e;
    }
}

async function getAllergenCatByID(id) {
    try {
        const res = await allergenCatModel.getAllergenCatByID(id)
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

async function createAllergenCat(body) {
    try {
        const nomCategorieAllergene = body.categorieAllergene;
        const res = await allergenCatModel.createAllergenCat(nomCategorieAllergene);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteAllergenCat(id) {
    try {
        const res = await allergenCatModel.deleteAllergenCat(id)
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

async function updateAllergenCat(id,body) {
    try {
        const newId = parseInt(id);
        const nomCategorieAllergene = body.categorieAllergene;

        const res = await allergenCatModel.updateAllergenCat(newId,nomCategorieAllergene)
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
    createAllergenCat,
    updateAllergenCat,
    deleteAllergenCat,
    getAllergenCatByID,
    getAllAllergenCats,
};
