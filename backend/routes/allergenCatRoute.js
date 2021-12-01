const express = require("express");
const router = express.Router();

const allergenCatController = require("../controllers/allergenCatController");

router.get("/all", async function (req, res, next) {
    try {
        const allergenCat = await allergenCatController.getAllAllergenCats();
        res.status(200).json(allergenCat)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const idAllergenCat = req.query.id;
        const allergenCat = await allergenCatController.getAllergenCatByID(idAllergenCat)
        if (!allergenCat) {
            return res.status(400).json({error: "Aucune Catégorie d'allergène"});
        }
        res.status(200).json({ message: allergenCat})
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des catégories d'allergènes"});
    }
});

router.post("/", async function (req, res, next) {
    try {
        await allergenCatController.createAllergenCat(req.body)
        res.status(200).json({ message: "Ajout effectué"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const idAllergenCat = req.query.id;
        const allergenCat = await allergenCatController.deleteAllergenCat(idAllergenCat)
        if (!allergenCat) {
            return res.status(400).json({error: "Aucune Catégorie d'allergène avec cet id"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const idAllergenCat = req.query.id;
        const allergenCat = await allergenCatController.updateAllergenCat(idAllergenCat, req.body)
        if (!allergenCat) {
            return res.status(400).json({error: "Aucune Catégorie d'allergène avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;
