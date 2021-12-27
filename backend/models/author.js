const db = require("../dataBase/index");

/* CRUD */

async function createAuthor(prenomAuteur, nomAuteur) {
  try {
    const res = await db.query(
      "INSERT INTO Auteur (prenomAuteur, nomAuteur) VALUES($1, $2) RETURNING idauteur;",
      [prenomAuteur, nomAuteur]
    );
    return res;
  } catch (e) {
    throw e;
  }
}

async function updateAuthor(id, prenomAuteur, nomAuteur) {
  try {
    const res = await db.query("UPDATE Auteur SET prenomAuteur = $1, nomAuteur = $2 WHERE idAuteur = $3;",
        [prenomAuteur, nomAuteur, id]);
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function deleteAuthor(id) {
  try {
    const res = await db.query("DELETE FROM Auteur WHERE idAuteur = $1;", [id]);
    return res;
  } catch (e) {
    throw e;
  }
}

async function getAllAuthors() {
  try {
    const res  = await db.query('SELECT * FROM auteur;')
    return res;
  } catch (e) {
    throw e;
  }
}

async function getAuthorByID(id) {
  try {
    const res = await db.query('SELECT * FROM auteur WHERE idauteur=$1',[id])
    return res;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorByID,
};
