const db = require("../dataBase");

/* CRUD */

async function createDatasheetCat(nomCategorieFicheTechnique) {
    try {
        const res = await db.query(
            "INSERT INTO CategorieFicheTechnique (nomCategorieFicheTechnique) VALUES($1) RETURNING idcategoriefichetechnique;",
            [nomCategorieFicheTechnique]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function updateDatasheetCat(id, nomCategorieFicheTechnique) {
    try {
        const res = await db.query(
            "UPDATE CategorieFicheTechnique SET nomCategorieFicheTechnique = $1 WHERE idCategorieFicheTechnique = $2;",
            [nomCategorieFicheTechnique, id]
        );
        return res
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function deleteDatasheetCat(id) {
    try {
        const res = await db.query(
            "DELETE FROM CategorieFicheTechnique WHERE idCategorieFicheTechnique = $1;",
            [id]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllDatasheetCats() {
    try {
        const res = await db.query("SELECT * FROM CategorieFicheTechnique;");
        return res;
    } catch (e) {
        throw e;
    }
}

async function getDatasheetCatByID(id) {
    try {
        const res = await db.query(
            "SELECT * FROM CategorieFicheTechnique WHERE idCategorieFicheTechnique = $1;",
            [id]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createDatasheetCat,
    updateDatasheetCat,
    deleteDatasheetCat,
    getAllDatasheetCats,
    getDatasheetCatByID,
};
