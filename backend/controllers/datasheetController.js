const DatasheetModel = require("../models/datasheet")

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
        console.log(body)
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
    getDatasheetByID
};
