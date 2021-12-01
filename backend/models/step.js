const db = require("../dataBase");

/* CRUD */

async function createStep(idFicheTechnique,titreEtape,descriptionEtape,tempsEtape) {
    try {
        const res = await db.query(
            "INSERT INTO etape (idFicheTechnique,titreEtape,descriptionEtape,tempsEtape) VALUES($1,$2,$3,$4);",
            [idFicheTechnique,titreEtape,descriptionEtape,tempsEtape]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function updateStep(id, idFicheTechnique,titreEtape,descriptionEtape,tempsEtape) {
    try {
        const res = await db.query(
            "UPDATE etape SET idFicheTechnique = $2,titreEtape =$3,descriptionEtape = $4,tempsEtape = $5 WHERE idetape = $1;",
            [id,idFicheTechnique,titreEtape,descriptionEtape,tempsEtape]
        );
        return res
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function deleteStep(id) {
    try {
        const res = await db.query(
            "DELETE FROM etape WHERE idEtape = $1;",
            [id]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllSteps() {
    try {
        const res = await db.query("SELECT * FROM etape;");
        return res;
    } catch (e) {
        throw e;
    }
}

async function getStepById(id) {
    try {
        const res = await db.query(
            "SELECT * FROM etape WHERE idEtape = $1;",
            [id]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createStep,
    updateStep,
    deleteStep,
    getStepById,
    getAllSteps,
};
