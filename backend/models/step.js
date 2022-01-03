const db = require("../dataBase");

/* CRUD */

async function createStep(idFicheTechnique,titreEtape,descriptionEtape,tempsEtape,numEtape) {
    try {
        const res = await db.query(
            "INSERT INTO etape (idFicheTechnique,titreEtape,descriptionEtape,tempsEtape,numEtape) VALUES($1,$2,$3,$4,$5) RETURNING idetape;",
            [idFicheTechnique,titreEtape,descriptionEtape,tempsEtape,numEtape]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function updateStep(id, idFicheTechnique,titreEtape,descriptionEtape,tempsEtape,numEtape) {
    try {
        const res = await db.query(
            "UPDATE etape SET idFicheTechnique = $2,titreEtape =$3,descriptionEtape = $4,tempsEtape = $5,numEtape = $6 WHERE idetape = $1;",
            [id,idFicheTechnique,titreEtape,descriptionEtape,tempsEtape,numEtape]
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

async function deleteAllDataSheetSteps(idFichetechnique) {
    try {
        const res = await db.query(
            "DELETE FROM etape WHERE idfichetechnique = $1;",
            [idFichetechnique]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllSteps() {
    try {
        const res = await db.query("SELECT * FROM etape ORDER BY numetape;");
        return res;
    } catch (e) {
        throw e;
    }
}


async function getGlobalTimeToMakeDataSheetChild(idDataSheet) {
    try {
        //const res = await db.query("SELECT Sum(tempsetape) as sumtempsetape  FROM etape e where e.idfichetechnique = $1 GROUP BY idfichetechnique;",
        //        [idDataSheet]);
        const res = await db.query("SELECT Sum(tempsetape) as tempsetape FROM etape e INNER JOIN fichetechniquejointure f on e.idfichetechnique = f.idfichetechniquefille WHERE f.idfichetechniqueparent = $1 AND e.idfichetechnique = f.idfichetechniquefille GROUP BY f.idfichetechniqueparent;",
                [idDataSheet]);
        return res;

    } catch (e) {
        throw e;
    }
}

async function getGlobalTimeToMakeDataSheet(idDataSheet) {
    try {
        const res = await db.query("SELECT Sum(tempsetape) as tempsetape  FROM etape e where e.idfichetechnique = $1 GROUP BY idfichetechnique;",
                [idDataSheet]);
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

async function getStepByDataSheetId(idFicheTechnique) {
    try {
        const res = await db.query(
            "SELECT * FROM etape WHERE idfichetechnique = $1 ORDER BY numetape;",
            [idFicheTechnique]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function getJSONStepByDataSheetId(idFicheTechnique) {
    try {
        const res = await db.query(
            "SELECT idetape FROM etape WHERE idfichetechnique = $1;",
            [idFicheTechnique]
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
    getStepByDataSheetId,
    getGlobalTimeToMakeDataSheetChild,
    getGlobalTimeToMakeDataSheet,
    deleteAllDataSheetSteps,
    getJSONStepByDataSheetId,
};
