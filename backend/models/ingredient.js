const db = require("../dataBase");

/* CRUD */

async function createIngredient(idCategorieIngredient,idCategorieAllergene,idUnite,nomIngredient,prixUnitaireIngredient,stock) {
    try {
        const res = await db.query(
            "INSERT INTO ingredient (idCategorieIngredient,idCategorieAllergene,idUnite,nomIngredient,prixUnitaireIngredient,stock) VALUES($1,$2,$3,$4,$5,$6) RETURNING idingredient;",
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
async function updateStockIngredient(id,stock) {
    try {
        const res = await db.query(
            "UPDATE ingredient SET stock = $2 WHERE idIngredient = $1;",
            [id,stock]
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

async function getIngredientByCatIngredient(idCatIng) {
    try {
        const res = await db.query(
            "SELECT * FROM ingredient WHERE idcategorieingredient = $1;",
            [idCatIng]
        );
        return res;
    } catch (e) {
        throw e;
    }
}

async function getIngredientStock(idIngredient) {
    try {
        const res = await db.query(
            "SELECT json_agg(stock) FROM ingredient WHERE idingredient = $1;",
            [idIngredient]
        );
        return res.rows[0].json_agg[0]; // json_agg permet de récupérer la réponse en un json transformé
        // On renvoi donc juste un int correspondant au stock présent dans la table
    } catch (e) {
        throw e;
    }
}

async function getAllIngredientsWithNegativeStock() {
    try {
        const res = await db.query(
            "SELECT * FROM ingredient NATURAL JOIN unite WHERE stock < 1;",
            []
        );
        return res.rows;
    } catch (e) {
        throw e;
    }
}

async function getAllIngredientByAllergenCat(idAllergenCat) {
    try {
        const res = await db.query(
            "SELECT * FROM ingredient NATURAL JOIN Unite WHERE idcategorieallergene = $1 ORDER BY nomingredient;",
            [idAllergenCat]
        );
        return res.rows;
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
    getIngredientByCatIngredient,
    updateStockIngredient,
    getIngredientStock,
    getAllIngredientsWithNegativeStock,
    getAllIngredientByAllergenCat,
};
