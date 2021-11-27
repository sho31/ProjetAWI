const uniteModel = require("../models/unit")

async function getAllUnits() {
    try {
        const res = await uniteModel.getAllUnits()
        return res.rows
    } catch (e) {
        throw e;
    }
}

async function getUnitById(id) {
    try {
        const res = await uniteModel.getUnitById(id)
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

async function getUnitByName(nomUnite) {
    try {
        const res = await uniteModel.getUnitByName(nomUnite)
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

async function createUnit(body) {
    try {
        const nomUnite = body.nomUnite;
        const res = await uniteModel.createUnit(nomUnite);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteUnit(id) {
    try {
        const res = await uniteModel.deleteUnit(id)
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

async function updateUnit(id,body) {
    try {
        const newId = parseInt(id);
        const nomUnite = body.nomUnite;

        const res = await uniteModel.updateUnit(newId,nomUnite)
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
    createUnit,
    updateUnit,
    deleteUnit,
    getAllUnits,
    getUnitById,
    getUnitByName
};
