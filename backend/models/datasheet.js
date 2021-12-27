const db = require("../dataBase/index");

/* CRUD */

async function createDatasheet(idCategorieFicheTechnique, idAuteur, nomPlat, nombreCouverts, image) {
    try {
        const res = await db.query(
            "INSERT INTO FicheTechnique (idcategoriefichetechnique, idauteur, nomplat, nombrecouverts, image) VALUES($1, $2, $3, $4,$5 ) RETURNING idfichetechnique;",
            [idCategorieFicheTechnique, idAuteur, nomPlat, nombreCouverts, image]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function updateDatasheet(id, idCategorieFicheTechnique, idAuteur, nomPlat, nombreCouverts, image) {
    try {
        const res = await db.query("UPDATE FicheTechnique SET idcategoriefichetechnique = $2, idauteur = $3, nomplat = $4, nombrecouverts = $5, image = $6 WHERE idFicheTechnique = $1;",
            [id, idCategorieFicheTechnique, idAuteur, nomPlat, nombreCouverts, image]);
        return res;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function deleteDatasheet(id) {
    try {
        const res = await db.query("DELETE FROM FicheTechnique WHERE idFicheTechnique = $1;", [id]);
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllDatasheets() {
    try {
        const res  = await db.query('SELECT * FROM FicheTechnique NATURAL JOIN auteur;')
        return res;
    } catch (e) {
        throw e;
    }
}

async function getDatasheetByID(id) {
    try {
        const res = await db.query('SELECT * FROM FicheTechnique NATURAL JOIN Auteur where idFicheTechnique=$1',[id])
        return res;
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
};
