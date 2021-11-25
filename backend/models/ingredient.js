const db = require("../dataBase");

/* CRUD */

async function createIngredient(idCategorieIngredient,idCategorieAllergene,idUnite,nomIngredient,prixUnitaireIngredient,stock) {
    try {
        const res = await db.query(
            "INSERT INTO ingredient (idCategorieIngredient,idCategorieAllergene,idUnite,nomIngredient,prixUnitaireIngredient,stock) VALUES($1,$2,$3,$4,$5,$6);",
            [idCategorieIngredient,idCategorieAllergene,idUnite,nomIngredient,prixUnitaireIngredient,stock]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function updateIngredient(id, idCategorieIngredient,idCategorieAllergene,idUnite,nomIngredient,prixUnitaireIngredient,stock) {
    try {
        const res = await db.query(
            "UPDATE ingredient SET idCategorieIngredient = $2,idCategorieAllergene =$3,idUnite = $4,nomIngredient = $5,prixUnitaireIngredient = $6,stock = $7 WHERE idIngredient = $1;",
            [id,idCategorieIngredient,idCategorieAllergene,idUnite,nomIngredient,prixUnitaireIngredient,stock]
        );
        return res
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function deleteIngredient(id) {
    try {
        const res = await db.query(
            "DELETE FROM ingredient WHERE idingredient = $1;",
            [id]
        );
        console.log(res)
        return res;
    } catch (e) {
        throw e;
    }
}

async function getAllIngredients() {
    try {
        const res = await db.query("SELECT * FROM ingredient;");
        return res;
    } catch (e) {
        throw e;
    }
}

async function getIngredientById(id) {
    try {
        const res = await db.query(
            "SELECT * FROM ingredient WHERE idingredient = $1;",
            [id]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createIngredient,
    updateIngredient,
    deleteIngredient,
    getAllIngredients,
    getIngredientById,
};
