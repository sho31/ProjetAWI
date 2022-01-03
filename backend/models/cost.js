const db = require("../dataBase");

/* CRUD */

async function createCost(idFicheTechnique,chargescalculated, chargescost, materialscost, coefwithcharges, coefwithoutcharges,includedDatasheetsCost) {
    try {
        const res = await db.query(
            "INSERT INTO cost (idFicheTechnique,chargescalculated, chargescost, materialscost, coefwithcharges, coefwithoutcharges,includeddatasheetscost) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING idcost;",
            [idFicheTechnique,chargescalculated, chargescost, materialscost, coefwithcharges, coefwithoutcharges,includedDatasheetsCost]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteCost(id) {
    try {
        const res = await db.query(
            "DELETE FROM cost WHERE idcost = $1;",
            [id]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteCostByDataSheetId(idFicheTechnique) {
    try {
        const res = await db.query(
            "DELETE FROM cost WHERE idfichetechnique = $1;",
            [idFicheTechnique]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllCosts() {
    try {
        const res = await db.query("SELECT * FROM cost;");
        return res;
    } catch (e) {
        throw e;
    }
}

async function getCostById(id) {
    try {
        const res = await db.query(
            "SELECT * FROM cost WHERE idcost = $1;",
            [id]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function getCostByDataSheetId(idFicheTechnique) {
    try {
        const res = await db.query(
            "SELECT * FROM cost WHERE idfichetechnique = $1;",
            [idFicheTechnique]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createCost,
    deleteCost,
    getCostById,
    getAllCosts,
    getCostByDataSheetId,
    deleteCostByDataSheetId,
};
