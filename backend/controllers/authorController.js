const authorModel = require("../models/author")

async function getAllAuthors() {
    try {
        return await authorModel.getAllAuthors()
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
        return res;
    } catch (e) {
        throw e;
    }
}

async function createAuthor(body) {
    try {
        const prenomAuteur  = body.prenomAuteur;
        const nomAuteur = body.nomAuteur;

        return await authorModel.createAuthor(prenomAuteur,nomAuteur);
    } catch (e) {
        throw e;
    }
}

async function deleteAuthor(id) {
    try {
        return await authorModel.deleteAuthor(id)
    } catch (e) {
        throw e;
    }
}

async function updateAuthor(id,body) {
    try {
        var newId = parseInt(id);
        const prenomAuteur  = body.prenomAuteur;
        const nomAuteur = body.nomAuteur;
        return await authorModel.updateAuthor(newId,prenomAuteur,nomAuteur)
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
