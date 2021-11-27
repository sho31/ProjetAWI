const DatasheetCatModel = require("../models/datasheetCat")

async function getAllDatasheetCats() {
    try {
        const res = await DatasheetCatModel.getAllDatasheetCats()
        return res.rows
    } catch (e) {
        throw e;
    }
}

async function getDatasheetCatByID(id) {
    try {
        const res = await DatasheetCatModel.getDatasheetCatByID(id)
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

async function createDatasheetCat(body) {
    try {
        const nomCategorieFicheTechnique = body.nomCategorieFicheTechnique;
        const res = await DatasheetCatModel.createDatasheetCat(nomCategorieFicheTechnique);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteDatasheetCat(id) {
    try {
        const res = await DatasheetCatModel.deleteDatasheetCat(id)
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

async function updateDatasheetCat(id,body) {
    try {
        const newId = parseInt(id);
        const nomCategorieFicheTechnique = body.nomCategorieFicheTechnique;

        const res = await DatasheetCatModel.updateDatasheetCat(newId,nomCategorieFicheTechnique)
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
    createDatasheetCat,
    updateDatasheetCat,
    deleteDatasheetCat,
    getAllDatasheetCats,
    getDatasheetCatByID
};
