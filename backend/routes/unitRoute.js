const express = require("express");
const router = express.Router();

const unitController = require("../controllers/unitController");

router.get("/all", async function (req, res, next) {
    try {
        const unit = await unitController.getAllUnits();
        console.log("Requete bien recue")
        res.status(200).json(unit)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const idUnit = req.query.id;
        const unit = await unitController.getUnitById(idUnit)
        if (!unit) {
            return res.status(400).json({error: "Aucune Unité"});
        }
        res.status(200).json(unit)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des unités"});
    }
});

router.post("/", async function (req, res, next) {
    try {
        await unitController.createUnit(req.body)
        res.status(200).json({ message: "Ajout effectué"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const idUnit = req.query.id;
        const unit = await unitController.deleteUnit(idUnit)
        if (!unit) {
            return res.status(400).json({error: "Aucune Unité avec cet id"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const idUnit = req.query.id;
        const unit = await unitController.updateUnit(idUnit, req.body)
        if (!unit) {
            return res.status(400).json({error: "Aucune Unité avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;
