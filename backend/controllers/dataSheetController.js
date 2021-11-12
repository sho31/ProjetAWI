async function getDataSheet() {
  try {
    dataSheet = "Voici le festival";
    return dataSheet;
  } catch (e) {
    throw e;
  }
}

module.exports = { getDataSheet };
