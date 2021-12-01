const authorModel = require("../models/author")

async function getAllAuthors() {
    try {
        const res = await authorModel.getAllAuthors()
        return res.rows;
    } catch (e) {
        throw e;
    }
}

async function getAuthorByID(id) {
    try {
        const res = await authorModel.getAuthorByID(id)
        if (res !== null) {
            if (res.rowCount > 0) {
                return res.rows;
            }
        }
        return null;
    } catch (e) {
        throw e;
    }
}

async function createAuthor(body) {
    try {
        const prenomAuteur  = body.prenomauteur;
        const nomAuteur = body.nomauteur;

        const res = await authorModel.createAuthor(prenomAuteur,nomAuteur);
        return res;
    } catch (e) {
        throw e;
    }
}

async function deleteAuthor(id) {
    try {
        const res = await authorModel.deleteAuthor(id)
        if (res !== null) {
            if (res.rowCount > 0) {
                return res;
            }
        }
        return null;
    } catch (e) {
        throw e;
    }
}

async function updateAuthor(id,body) {
    try {
        var newId = parseInt(id);
        const prenomAuteur  = body.prenomauteur;
        const nomAuteur = body.nomauteur;
        const res = await authorModel.updateAuthor(newId,prenomAuteur,nomAuteur)
        if (res !== null) {
            if (res.rowCount > 0) {
                return res;
            }
        }
        return null;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAllAuthors,
    getAuthorByID
};
