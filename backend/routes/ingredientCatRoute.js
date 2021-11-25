const express = require("express");
const router = express.Router();

const ingredientCatController = require("../controllers/ingredientCatController");

router.get("/allIngredientCats", async function (req, res, next) {
    try {
        const ingredientCat = await ingredientCatController.getAllIngredientCats();
        res.status(200).json({ message: ingredientCat})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const idIngredientCat = req.query.id;
        const ingredientCat = await ingredientCatController.getIngredientCatByID(idIngredientCat)
        if (!ingredientCat) {
            return res.status(400).json({error: "Aucune Catégorie d'ingrédients"});
        }
        res.status(200).json({ message: ingredientCat})
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des catégories d'ingrédients"});
    }
});

router.post("/add", async function (req, res, next) {
    try {
        await ingredientCatController.createIngredientCat(req.body)
        res.status(200).json({ message:  "Ajout effectué"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/delete", async function (req, res, next) {
    try {
        const idIngredientCat = req.query.id;
        const ingredientCat = await ingredientCatController.deleteIngredientCat(idIngredientCat)
        if (!ingredientCat) {
            return res.status(400).json({error: "Aucune Catégorie d'ingrédients avec cet id"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const idIngredientCat = req.query.id;
        const ingredientCat = await ingredientCatController.updateIngredientCat(idIngredientCat, req.body)
        if (!ingredientCat) {
            return res.status(400).json({error: "Aucune Catégorie d'ingrédients avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;
