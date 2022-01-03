const express = require("express");
const router = express.Router();

const DatasheetController = require("../controllers/datasheetController");
const {json} = require("express");

router.get("/all", async function (req, res, next) {
    try {
        const Datasheet = await DatasheetController.getAllDatasheets();
        if (!Datasheet) {
            return res.status(204).json({message: "Aucune fiche technique"});
        }
        res.status(200).json(Datasheet)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const idDatasheet = req.query.id;
        const Datasheet = await DatasheetController.getDatasheetByID(idDatasheet)
        if (!Datasheet) {
            return res.status(204).json({message: "Aucune fiche technique"});
        }
        res.status(200).json(Datasheet)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des fiches technique"});
    }
});

router.post("/", async function (req, res, next) {
    try {
        let result = await DatasheetController.createDatasheet(req.body)
        res.status(200).json({result})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const idDatasheet = req.query.id;
        const Datasheet = await DatasheetController.deleteDatasheet(idDatasheet)
        if (!Datasheet) {
            return res.status(204).json({message: "Aucune fiche technique avec cet id"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/withAllComponents", async function (req, res, next) {
    try {
        const idDatasheet = req.query.id;
        const Datasheet = await DatasheetController.deleteDatasheetAndAllComponents(idDatasheet)
        if (!Datasheet) {
            return res.status(204).json({message: "Aucune fiche technique avec cet id"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});


router.put("/", async function (req, res, next) {
    try {
        const idDatasheet = req.query.id;
        const Datasheet = await DatasheetController.updateDatasheet(idDatasheet, req.body)
        if (!Datasheet) {
            return res.status(204).json({message: "Aucune fiche technique avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;
