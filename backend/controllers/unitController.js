const unitModel = require("../models/unit")

async function getAllUnits() {
    try {
        const res = await unitModel.getAllUnits()
        return res.rows
    } catch (e) {
        throw e;
    }
}

async function getUnitById(id) {
    try {
        const res = await unitModel.getUnitById(id)
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
        const res = await unitModel.getUnitByName(nomUnite)
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
        const res = await unitModel.createUnit(nomUnite);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteUnit(id) {
    try {
        const res = await unitModel.deleteUnit(id)
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

        const res = await unitModel.updateUnit(newId,nomUnite)
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
