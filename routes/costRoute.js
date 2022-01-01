const express = require("express");
const router = express.Router();

const costController = require("../controllers/costController");

router.get("/all", async function (req, res, next) {
    try {
        const ingredient = await costController.getAllCosts();
        res.status(200).json(ingredient)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const idCost = req.query.id;
        const cost = await costController.getCostById(idCost)
        if (!cost) {
            return res.status(204).json({message: "Aucun coût"});
        }
        res.status(200).json(cost)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des cos"});
    }
});

router.get("/bydatasheet", async function (req, res, next) {
    try {
        const idDataSheet = req.query.id;
        const cost = await costController.getCostByDataSheetId(idDataSheet)
        if (!cost) {
            return res.status(204).json({message: "Aucune table coût!"});
        }
        res.status(200).json(cost)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des coûts"});
    }
});

router.post("/", async function (req, res, next) {
    try {
        let result = await costController.createCost(req.body)
        res.status(200).json({result})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const idCost = req.query.id;
        const cost = await costController.deleteCost(idCost)
        if (!cost) {
            return res.status(400).json({error: "Aucun coût avec cet id"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const idCost = req.query.id;
        const cost = await costController.updateCost(idCost, req.body)
        if (!cost) {
            return res.status(400).json({error: "Aucun coût avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

module.exports = router;
