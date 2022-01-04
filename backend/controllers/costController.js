const costModel = require("../models/cost")

async function getAllCosts() {
    try {
        const res = await costModel.getAllCosts()
        return res.rows;
    } catch (e) {
        throw e;
    }
}

async function getCostById(id) {
    try {
        const res = await costModel.getCostById(id)
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

async function getCostByDataSheetId(idFicheTechnique) {
    try {
        const res = await costModel.getCostByDataSheetId(idFicheTechnique)
        console.log("res", res.rows[0])
        if (res !== null) {
            if (res.rowCount > 0) {
                return res.rows[0];
            }
        }
        return null;
    } catch (e) {
        throw e;
    }
}
async function createCost(body) {
    try {
        const idFicheTechnique  = parseInt(body.idfichetechnique);
        const chargescalculated  = body.chargescalculated;
        const chargescost = body.chargescost;
        const materialscost = body.materialscost;
        const coefwithcharges = body.coefwithcharges
        const coefwithoutcharges = body.coefwithoutcharges;
        const includeddatasheetscost = body.includeddatasheetscost;

        const res = await costModel.createCost(idFicheTechnique,chargescalculated, chargescost, materialscost, coefwithcharges, coefwithoutcharges,includeddatasheetscost);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteCost(id) {
    try {
        const res = await costModel.deleteCost(id)
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
    createCost,
    deleteCost,
    getAllCosts,
    getCostById,
    getCostByDataSheetId,
};
