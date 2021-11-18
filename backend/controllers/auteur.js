async function getAllAutors() {
    try {
        dataSheet = "Voici le festival";
        return dataSheet;
    } catch (e) {
        throw e;
    }
}

module.exports = { getAllAutors };
