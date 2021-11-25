const express = require("express");
const router = express.Router();

const allergenCatController = require("../controllers/allergenCatController");

router.get("/", async function (req, res, next) {
    try {
        const allergenCat = await allergenCatController.getAllAllergenCats();
        res.status(200).json({ message: allergenCat})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/:id", async function (req, res, next) {
    try {
        const idAllergenCat = req.params.id;
        const allergenCat = await allergenCatController.getAllergenCatByID(idAllergenCat)
        if (!allergenCat) {
            return res.status(400).json({error: "Aucune Catégorie d'ingrédients"});
        }
        res.status(200).json({ message: allergenCat})
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des catégories d'ingrédients"});
    }
});

router.post("/add", async function (req, res, next) {
    try {
        const allergenCat = await allergenCatController.createAllergenCat(req.body)
        res.status(200).json({ message: "Ajout effectué"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/delete/:id", async function (req, res, next) {
    try {
        const idAllergenCat = req.params.id;
        const allergenCat = await allergenCatController.deleteAllergenCat(idAllergenCat)
        if (!allergenCat) {
            return res.status(400).json({error: "Aucune Catégorie d'ingrédients avec cet id"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/:id", async function (req, res, next) {
    try {
        const idAllergenCat = req.params.id;
        const allergenCat = await allergenCatController.updateAllergenCat(idAllergenCat, req.body)
        if (!allergenCat) {
            return res.status(400).json({error: "Aucune Catégorie d'ingrédients avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;
