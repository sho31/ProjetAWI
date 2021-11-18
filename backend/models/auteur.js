const db = require("../database");

async function getAllAutors() {
    try {
        const { rows } = await db.query("select * from auteur;", []);
        return rows;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    getAllAutors,
};
