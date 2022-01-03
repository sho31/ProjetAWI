const DatasheetModel = require("../models/datasheet")
const StepModel = require("../models/step")
const DatasheetJoinModel = require("../models/datasheetJoin")
const CostModel = require("../models/cost")
const IngredientStepJoinModel = require("../models/ingredientStepjoin")

async function getAllDatasheets() {
    try {
        const res = await DatasheetModel.getAllDatasheets()
        return res.rows;
    } catch (e) {
        throw e;
    }
}

async function getDatasheetByID(id) {
    try {
        const res = await DatasheetModel.getDatasheetByID(id)
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

async function createDatasheet(body) {
    try {
        const idCategorieFicheTechnique = parseInt(body.idcategoriefichetechnique);
        const idAuteur = parseInt(body.idauteur);
        const nomPlat = body.nomplat;
        const nombreCouverts = parseInt(body.nombrecouverts);
        const image = body.image;
        const res = await DatasheetModel.createDatasheet(idCategorieFicheTechnique, idAuteur, nomPlat, nombreCouverts, image);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteDatasheet(id) {
    try {
        const res = await DatasheetModel.deleteDatasheet(id)
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

async function deleteDatasheetAndAllComponents(id) {
    try {
        // deletes des etapes et ingrédients jointure
        const res = await StepModel.getJSONStepByDataSheetId(id);
        for(let i =0;i<res.rows.length;i++){
            await IngredientStepJoinModel.deleteIngredientStepJoin(res.rows[i].idetape);
        }
        // delete toutes les étapes de la fiche technique
        const resA = await StepModel.deleteAllDataSheetSteps(id);
        if(resA != null){
            console.log("ok1")
            // delete toutes les apparitions dans la fichetechniquejointure
            await DatasheetJoinModel.deleteDatasheetJoinByParentDataSheetId(id);

            const resB = await CostModel.deleteCostByDataSheetId(id)
            if (resB !== null) {
                // delete de la fiche technique
                console.log("ok2")
                const resC = await DatasheetModel.deleteDatasheet(id)
                if (resC !== null) {
                    console.log("ok3")
                    return resC;
                }

            }
            return null
        }
        return null;
    } catch (e) {
        throw e;
    }
}

async function updateDatasheet(id,body) {
    try {
        var newId = parseInt(id);
        const idCategorieFicheTechnique = parseInt(body.idcategoriefichetechnique);
        const idAuteur = parseInt(body.idauteur);
        const nomPlat = body.nomplat;
        const nombreCouverts = parseInt(body.nombrecouverts);
        const image = body.image;
        const res = await DatasheetModel.updateDatasheet(newId,idCategorieFicheTechnique, idAuteur, nomPlat, nombreCouverts, image)
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
    createDatasheet,
    updateDatasheet,
    deleteDatasheet,
    getAllDatasheets,
    getDatasheetByID,
    deleteDatasheetAndAllComponents,
};
