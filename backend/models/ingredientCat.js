const db = require("../dataBase");

/* CRUD */

async function createIngredientCat(nomCategorieIngredient) {
  try {
    const res = await db.query(
      "INSERT INTO CategorieIngredient (nomCategorieIngredient) VALUES($1);",
      [nomCategorieIngredient]
    );
    return res;
  } catch (e) {
    throw e;
  }
}

async function updateIngredientCat(id, nomCategorieIngredient) {
  try {
    const res = await db.query(
      "UPDATE CategorieIngredient SET nomCategorieIngredient = $1 WHERE idCategorieIngredient = $2;",
      [nomCategorieIngredient, id]
    );
    return res
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function deleteIngredientCat(id) {
  try {
    const res = await db.query(
      "DELETE FROM CategorieIngredient WHERE idCategorieIngredient = $1;",
      [id]
    );
    return res;
  } catch (e) {
    throw e;
  }
}

async function getAllIngredientCats() {
  try {
    const res = await db.query("SELECT * FROM CategorieIngredient;");
    return res;
  } catch (e) {
    throw e;
  }
}

async function getAllIngredientByCatIngredient(idCatIng) {
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

async function getIngredientCatByID(id) {
  try {
    const res = await db.query(
      "SELECT * FROM CategorieIngredient WHERE idCategorieIngredient = $1;",
      [id]
    );
    return res;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  createIngredientCat,
  updateIngredientCat,
  deleteIngredientCat,
  getAllIngredientCats,
  getIngredientCatByID,
  getAllIngredientByCatIngredient,
};
