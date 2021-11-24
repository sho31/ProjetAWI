const dataSheet = require("../models/dataSheet")

async function getDataSheet() {
  try {
    let dataSheets = await dataSheet.getAllDataSheet()
    return dataSheets;
  } catch (e) {
    throw e;
  }
}

module.exports = { getDataSheet };
