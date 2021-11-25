const uniteModel = require("../models/unite")

async function getAllUnites() {
    try {
        const res = await uniteModel.getAllUnites()
        return res.rows
    } catch (e) {
        throw e;
    }
}

async function getUniteById(id) {
    try {
        const res = await uniteModel.getUniteById(id)
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

async function createUnite(body) {
    try {
        const nomUnite = body.nomUnite;
        const res = await uniteModel.createUnite(nomUnite);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteUnite(id) {
    try {
        const res = await uniteModel.deleteUnite(id)
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

async function updateUnite(id,body) {
    try {
        const newId = parseInt(id);
        const nomUnite = body.nomUnite;

        const res = await uniteModel.updateUnite(newId,nomUnite)
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
    createUnite,
    updateUnite,
    deleteUnite,
    getAllUnites,
    getUniteById,
};
