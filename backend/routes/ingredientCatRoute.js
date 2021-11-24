const express = require("express");
const router = express.Router();

const ingredientCatController = require("../controllers/ingredientCatController");

router.get("/", async function (req, res, next) {
    try {
        const ingredientCat = await ingredientCatController.getAllIngredientCats();
        res.status(200).json({ message: ingredientCat})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/:id", async function (req, res, next) {
    try {
        const idIngredientCat = req.params.id;
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
        const ingredientCat = await ingredientCatController.createIngredientCat(req.body)
        res.status(200).json({ message: ingredientCat})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/delete/:id", async function (req, res, next) {
    try {
        const idIngredientCat = req.params.id;
        const ingredientCat = await ingredientCatController.deleteIngredientCat(idIngredientCat)
        res.status(200).json({ message: ingredientCat})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/:id", async function (req, res, next) {
    try {
        const idIngredientCat = req.params.id;
        const ingredientCat = await ingredientCatController.updateIngredientCat(idIngredientCat, req.body)
        res.status(200).json({ message: ingredientCat})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;
