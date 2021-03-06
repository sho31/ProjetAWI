const express = require("express");
const router = express.Router();

const stepController = require("../controllers/stepController");

router.get("/all", async function (req, res, next) {
    try {
        const ingredient = await stepController.getAllSteps();
        res.status(200).json(ingredient)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const idStep = req.query.id;
        const step = await stepController.getStepById(idStep)
        if (!step) {
            return res.status(204).json({message: "Aucune étape"});
        }
        res.status(200).json(step)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des étapes"});
    }
});

router.get("/globaltime", async function (req, res, next) {
    try {
        const idDataSheet = req.query.id;
        const step = await stepController.getGlobalTimeToMakeDataSheet(idDataSheet)
        if (!step) {
            return res.status(204).json({message: "Aucune étape"});
        }
        res.status(200).json(step)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des étapes"});
    }
});
router.get("/globaltime/child", async function (req, res, next) {
    try {
        const idDataSheet = req.query.id;
        const step = await stepController.getGlobalTimeToMakeDataSheetChild(idDataSheet)
        if (!step) {
            return res.status(204).json({message: "Aucune étape"});
        }
        res.status(200).json(step)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des étapes"});
    }
});

router.get("/bydatasheet", async function (req, res, next) {
    try {
        const idDataSheet = req.query.id;
        const step = await stepController.getStepByDataSheetId(idDataSheet)
        if (!step) {
            return res.status(204).json({message: "Aucune étape"});
        }
        res.status(200).json(step)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des étapes"});
    }
});

router.post("/", async function (req, res, next) {
    try {
        let result = await stepController.createStep(req.body)
        res.status(200).json({result})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const idStep = req.query.id;
        const step = await stepController.deleteStep(idStep)
        if (!step) {
            return res.status(400).json({error: "Aucune étape avec cet id"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const idStep = req.query.id;
        const step = await stepController.updateStep(idStep, req.body)
        if (!step) {
            return res.status(400).json({error: "Aucune étape avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

module.exports = router;
