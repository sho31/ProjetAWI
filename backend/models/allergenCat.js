const db = require("../dataBase");

/* CRUD */

async function createAllergenCat(nomcategorieAllergene) {
    try {
        const res = await db.query(
            "INSERT INTO CategorieAllergene (CategorieAllergene) VALUES($1) RETURNING idcategorieallergene;",
            [nomcategorieAllergene]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function updateAllergenCat(id, nomcategorieAllergene) {
    try {
        const res = await db.query(
            "UPDATE CategorieAllergene SET categorieAllergene = $1 WHERE idcategorieallergene = $2;",
            [nomcategorieAllergene, id]
        );
        return res
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function deleteAllergenCat(id) {
    try {
        const res = await db.query(
            "DELETE FROM CategorieAllergene WHERE idcategorieallergene = $1;",
            [id]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllAllergenCats() {
    try {
        const res = await db.query("SELECT * FROM CategorieAllergene;");
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllergenCatByID(id) {
    try {
        const res = await db.query(
            "SELECT * FROM CategorieAllergene WHERE idCategorieAllergene = $1;",
            [id]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createAllergenCat,
    updateAllergenCat,
    deleteAllergenCat,
    getAllergenCatByID,
    getAllAllergenCats,
};
