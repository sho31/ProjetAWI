const express = require("express");
const router = express.Router();

const uniteController = require("../controllers/uniteController");

router.get("/", async function (req, res, next) {
    try {
        const unite = await uniteController.getAllUnites();
        res.status(200).json({ message: unite})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/:id", async function (req, res, next) {
    try {
        const idUnite = req.params.id;
        const unite = await uniteController.getUniteById(idUnite)
        if (!unite) {
            return res.status(400).json({error: "Aucune Unité"});
        }
        res.status(200).json({ message: unite})
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des unités"});
    }
});

router.post("/add", async function (req, res, next) {
    try {
        await uniteController.createUnite(req.body)
        res.status(200).json({ message: "Ajout effectué"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/delete/:id", async function (req, res, next) {
    try {
        const idUnite = req.params.id;
        const unite = await uniteController.deleteUnite(idUnite)
        if (!unite) {
            return res.status(400).json({error: "Aucune Unité avec cet id"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/:id", async function (req, res, next) {
    try {
        const idUnite = req.params.id;
        const unite = await uniteController.updateUnite(idUnite, req.body)
        if (!unite) {
            return res.status(400).json({error: "Aucune Unité avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;
