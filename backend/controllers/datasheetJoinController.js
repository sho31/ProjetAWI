const DatasheetJoinModel = require("../models/datasheetJoin")

async function getAllDatasheetJoins() {
    try {
        const res = await DatasheetJoinModel.getAllDatasheetJoins()
        return res.rows;
    } catch (e) {
        throw e;
    }
}

async function getDatasheetJoinByID(idFicheTechniqueParent) {
    try {
        const res = await DatasheetJoinModel.getDatasheetJoinByID(idFicheTechniqueParent)
        if (res !== null) {
            if (res.rowCount > 0) {
                console.log(res.rows)
                return res.rows;
            }
        }
        return null;
    } catch (e) {
        throw e;
    }
}

async function createDatasheetJoin(body) {
    try {
        const idFicheTechniqueParent = body.idfichetechniqueparent;
        const idFicheTechniqueFille = body.idfichetechniquefille;
        const numEtape = body.numetape;

        const res = await DatasheetJoinModel.createDatasheetJoin(idFicheTechniqueParent,idFicheTechniqueFille, numEtape);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteDatasheetJoin(idFicheTechniqueParent, idFicheTechniqueFille) {
    try {
        const res = await DatasheetJoinModel.deleteDatasheetJoin(idFicheTechniqueParent, idFicheTechniqueFille)
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
//It is only possible to change numEtape, otherwise delete
async function updateDatasheetJoin(idFicheTechniqueParent, idFicheTechniqueFille, body) {
    try {
        
        const newNumEtape = body.numetape;
        const res = await DatasheetJoinModel.updateDatasheetJoin(idFicheTechniqueParent,idFicheTechniqueFille, newNumEtape)
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
    createDatasheetJoin,
    updateDatasheetJoin,
    deleteDatasheetJoin,
    getAllDatasheetJoins,
    getDatasheetJoinByID
};
