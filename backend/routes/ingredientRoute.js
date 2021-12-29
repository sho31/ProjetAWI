const express = require("express");
const router = express.Router();

const ingredientController = require("../controllers/ingredientController");

router.get("/all", async function (req, res, next) {
    try {
        const ingredient = await ingredientController.getAllIngredients();
        res.status(200).json(ingredient)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const idIngredient = req.query.id;
        const ingredient = await ingredientController.getIngredientById(idIngredient)
        if (!ingredient) {
            return res.status(204).json({message: "Aucun ingrédient"});
        }
        res.status(200).json(ingredient)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des auteurs"});
    }
});

router.get("/bycatallergen", async function (req, res, next) {
    try {
        const idCatAllergen = req.query.id;
        const ingredient = await ingredientController.getAllIngredientByAllergenCat(idCatAllergen);
        res.status(200).json(ingredient)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/withnegativestock", async function (req, res, next) {
    try {
        const ingredient = await ingredientController.getAllIngredientsWithNegativeStock()
        if (!ingredient) {
            return res.status(204).json({message: "Aucun ingrédient"});
        }
        res.status(200).json(ingredient)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des auteurs"});
    }
});

router.post("/", async function (req, res, next) {
    try {
        await ingredientController.createIngredient(req.body)
        res.status(200).json({ message:  "Ajout effectué"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const idIngredient = req.query.id;
        const ingredient = await ingredientController.deleteIngredient(idIngredient)
        if (!ingredient) {
            return res.status(204).json({message: "Aucun ingrédient avec cet id"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const idIngredient = req.query.id;
        const ingredient = await ingredientController.updateIngredient(idIngredient, req.body)
        if (!ingredient) {
            return res.status(204).json({message: "Aucun ingrédient avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/removestock", async function (req, res, next) {
    try {
        const idIngredient = req.query.id;
        const quantite = req.query.quantite;
        const ingredient = await ingredientController.removeStockFromIngredient(idIngredient, quantite)
        if (!ingredient) {
            return res.status(204).json({message: "Aucun ingrédient avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/addstock", async function (req, res, next) {
    try {
        const idIngredient = req.query.id;
        const quantite = req.query.quantite;
        const ingredient = await ingredientController.addStockIngredient(idIngredient, quantite)
        if (!ingredient) {
            return res.status(204).json({message: "Aucun ingrédient avec cet id"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;
