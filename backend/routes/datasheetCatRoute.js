const express = require("express");
const router = express.Router();

const DatasheetCatController = require("../controllers/datasheetCatController");

router.get("/all", async function (req, res, next) {
    try {
        const DatasheetCat = await DatasheetCatController.getAllDatasheetCats();
        res.status(200).json(DatasheetCat)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        console.log(id)
        const DatasheetCat = await DatasheetCatController.getDatasheetCatByID(id)
        if (!DatasheetCat) {
            return res.status(400).json({error: "Aucune Catégorie de fiche technique"});
        }
        res.status(200).json(DatasheetCat)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des catégories de fiches techniques"});
    }
});

router.post("/", async function (req, res, next) {
    try {
        await DatasheetCatController.createDatasheetCat(req.body)
        res.status(200).json({ message:  "Ajout effectué"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const DatasheetCat = await DatasheetCatController.deleteDatasheetCat(id)
        if (!DatasheetCat) {
            return res.status(400).json({error: "Aucune Catégorie de fiches technique avec cet id"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const DatasheetCat = await DatasheetCatController.updateDatasheetCat(id, req.body)
        if (!DatasheetCat) {
            return res.status(400).json({error: "Aucune Catégorie de fiches technique avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;
