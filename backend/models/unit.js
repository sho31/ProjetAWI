const db = require("../dataBase");

/* CRUD */

async function createUnit(nomUnite) {
    try {
        const res = await db.query(
            "INSERT INTO Unite (nomUnite) VALUES($1) RETURNING idunite;",
            [nomUnite]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function updateUnit(id, nomUnite) {
    try {
        const res = await db.query(
            "UPDATE Unite SET nomUnite = $1 WHERE idUnite = $2;",
            [nomUnite, id]
        );
        return res
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function deleteUnit(id) {
    try {
        const res = await db.query(
            "DELETE FROM Unite WHERE idUnite = $1;",
            [id]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllUnits() {
    try {
        const res = await db.query("SELECT * FROM Unite;");
        return res;
    } catch (e) {
        throw e;
    }
}

async function getUnitById(id) {
    try {
        const res = await db.query(
            "SELECT * FROM Unite WHERE idUnite = $1;",
            [id]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

/*
async function getUnitById(id) {
    try {
        const resA = await db.query(
            //  "SELECT idfichetechniquefille,nomingredient,prixunitaireingredient,quantite FROM fichetechnique f INNER JOIN fichetechniquejointure fj ON f.idfichetechnique=fj.idfichetechniqueparent NATURAL JOIN ingredientetapejointure NATURAL JOIN ingredient WHERE idfichetechnique = $1 group by nomingredient, prixunitaireingredient,idfichetechniquefille,quantite ORDER BY idfichetechniquefille;",
            "SELECT idfichetechniquefille as nbfichetechnique FROM fichetechniquejointure WHERE idfichetechniqueparent=$1;",
            [id]
        );
        const nbdefichetechniquefille = resA.rowCount;
        if(nbdefichetechniquefille > 0){ // on récupère les éléments des fiches techniques filles
            const resB = await db.query(
                  "SELECT idfichetechniquefille,nomingredient,prixunitaireingredient,(quantite/$2) as quantite FROM fichetechnique f INNER JOIN fichetechniquejointure fj ON f.idfichetechnique=fj.idfichetechniqueparent NATURAL JOIN ingredientetapejointure NATURAL JOIN ingredient WHERE idfichetechnique = $1 group by nomingredient, prixunitaireingredient,idfichetechniquefille,quantite ORDER BY idfichetechniquefille;",
                [id,nbdefichetechniquefille]
            );
            return resB;
        }
        else{// aucune fiche technique fille

            return resB;
        }

    } catch (e) {
        throw e;
    }
}
*/

async function getUnitByName(nomUnite) {
    try {
        const res = await db.query(
            "SELECT * FROM Unite WHERE nomUnite = $1;",
            [nomUnite]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createUnit,
    updateUnit,
    deleteUnit,
    getAllUnits,
    getUnitById,
    getUnitByName
};
