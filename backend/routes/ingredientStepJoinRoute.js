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
            return res.status(204).json({message:"Il n'y a rien dans la jointure"})
        }
        res.status(200).json(ingredientStepJoin)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des FicheTechniqueJointure"});
    }
});

router.get("/catallergen", async function (req, res, next) {
    try {
        const idFicheTechnique = req.query.idFicheTechnique;
        const ingredientStepJoin = await IngredientStepJoinController.getAllergenCatListStepId(idFicheTechnique)
        if (!ingredientStepJoin) {
            return res.status(204).json({message:"Il n'y a rien dans la jointure"})
        }
        res.status(200).json(ingredientStepJoin)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des FicheTechniqueJointure"});
    }
});

router.get("/catingredient", async function (req, res, next) {
    try {
        const idFicheTechnique = req.query.idFicheTechnique;
        const ingredientStepJoin = await IngredientStepJoinController.getIngredientCatListStepId(idFicheTechnique)
        if (!ingredientStepJoin) {
            return res.status(204).json({message:"Il n'y a rien dans la jointure"})
        }
        res.status(200).json(ingredientStepJoin)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des FicheTechniqueJointure"});
    }
});

router.get("/allergenlist", async function (req, res, next) {
    try {
        const idFicheTechnique = req.query.idFicheTechnique;
        const idCatAllergene = req.query.idCatAllergene;
        const ingredientStepJoin = await IngredientStepJoinController.getAllergenListByCatAndStepId(idFicheTechnique,idCatAllergene)
        if (!ingredientStepJoin) {
            return res.status(204).json({message:"Il n'y a rien dans la jointure"})
        }
        res.status(200).json(ingredientStepJoin)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des FicheTechniqueJointure"});
    }
});

router.get("/ingredientlist", async function (req, res, next) {
    try {
        const idFicheTechnique = req.query.idFicheTechnique;
        const idIngredientCat = req.query.idIngredientCat;
        console.log(idIngredientCat)
        const ingredientStepJoin = await IngredientStepJoinController.getIngredientStepJoinByDataSheetID(idFicheTechnique,idIngredientCat)
        if (!ingredientStepJoin) {
            return res.status(204).json({message:"Il n'y a rien dans la jointure"})
        }
        return res.status(200).json(ingredientStepJoin)
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
            return res.status(204).json({message: "Aucune IngredientEtapeJointure avec ces id : il faut entrer idEtape et idIngredient en paramètres de query"});
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
            return res.status(204).json({message: "Aucune IngredientEtapeJointure avec ces id : il faut entrer idEtape et idIngredient en paramètres de query"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

module.exports = router;
