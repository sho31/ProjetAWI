const express = require("express");
const router = express.Router();

const IngredientStepJoinController = require("../controllers/ingredientStepJoinController");

router.get("/all", async function (req, res, next) {
    try {
        const ingredientStepJoin = await IngredientStepJoinController.getAllIngredientStepJoins();
        res.status(200).json(ingredientStepJoin)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const idEtape = req.query.idEtape;
        const ingredientStepJoin = await IngredientStepJoinController.getIngredientStepJoinByStepId(idEtape)
        if (!ingredientStepJoin) {
            return res.status(204);
        }
        res.status(200).json(ingredientStepJoin)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des FicheTechniqueJointure"});
    }
});

router.post("/", async function (req, res, next) {
    try {
        await IngredientStepJoinController.createIngredientStepJoin(req.body)
        res.status(200).json({ message:  "Ajout effectué"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const idEtape = req.query.idEtape;
        const idIngredient = req.query.idIngredient;
        const ingredientStepJoin = await IngredientStepJoinController.deleteIngredientStepJoin(idEtape, idIngredient)
        if (!ingredientStepJoin) {
            return res.status(400).json({error: "Aucune IngredientEtapeJointure avec ces id : il faut entrer idEtape et idIngredient en paramètres de query"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const idEtape = req.query.idEtape;
        const idIngredient = req.query.idIngredient;
        const ingredientStepJoin = await IngredientStepJoinController.updateIngredientStepJoin(idEtape, idIngredient, req.body)
        if (!ingredientStepJoin) {
            return res.status(400).json({error: "Aucune IngredientEtapeJointure avec ces id : il faut entrer idEtape et idIngredient en paramètres de query"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;
