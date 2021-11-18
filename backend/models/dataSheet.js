const db = require("../database");

async function getAllDataSheet() {
  try {
    const { rows } = await db.query("select * from DataSheet;", []);
    return rows;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  getAllDataSheet,
};
