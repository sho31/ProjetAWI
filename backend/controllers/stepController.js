const stepModel = require("../models/step")

async function getAllSteps() {
    try {
        const res = await stepModel.getAllSteps()
        return res.rows;
    } catch (e) {
        throw e;
    }
}

async function getStepById(id) {
    try {
        const res = await stepModel.getStepById(id)
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

async function getStepByDataSheetId(idFicheTechnique) {
    try {
        const res = await stepModel.getStepByDataSheetId(idFicheTechnique)
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
async function createStep(body) {
    try {
        const idFicheTechnique  = parseInt(body.idfichetechnique);
        const titreEtape  = body.titreetape;
        const descriptionEtape  = body.descriptionetape;
        const tempsEtape  = body.tempsetape;
        const numEtape  = body.numetape;

        const res = await stepModel.createStep(idFicheTechnique,titreEtape,descriptionEtape,tempsEtape,numEtape);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteStep(id) {
    try {
        const res = await stepModel.deleteStep(id)
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

async function updateStep(id,body) {
    try {
        const newId = parseInt(id);
        const idFicheTechnique  = parseInt(body.idfichetechnique);
        const titreEtape  = body.titreetape;
        const descriptionEtape  = body.descriptionetape;
        const tempsEtape  = body.tempsetape;
        const numEtape  = body.numetape;

        const res = await stepModel.updateStep(newId,idFicheTechnique,titreEtape,descriptionEtape,tempsEtape,numEtape);
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
    createStep,
    updateStep,
    deleteStep,
    getAllSteps,
    getStepById,
    getStepByDataSheetId,
};
