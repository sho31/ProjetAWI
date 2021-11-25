const db = require("../dataBase");

/* CRUD */

async function createUnite(nomUnite) {
    try {
        const res = await db.query(
            "INSERT INTO Unite (nomUnite) VALUES($1);",
            [nomUnite]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function updateUnite(id, nomUnite) {
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

async function deleteUnite(id) {
    try {
        console.log("test")
        const res = await db.query(
            "DELETE FROM Unite WHERE idUnite = $1;",
            [id]
        );
        console.log(res)
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllUnites() {
    try {
        const res = await db.query("SELECT * FROM Unite;");
        return res;
    } catch (e) {
        throw e;
    }
}

async function getUniteById(id) {
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

module.exports = {
    createUnite,
    updateUnite,
    deleteUnite,
    getAllUnites,
    getUniteById,
};
