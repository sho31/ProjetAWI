const express = require("express");
const router = express.Router();

const DatasheetJoinController = require("../controllers/datasheetJoinController");

router.get("/all", async function (req, res, next) {
    try {
        const DatasheetJoin = await DatasheetJoinController.getAllDatasheetJoins();
        res.status(200).json(DatasheetJoin)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const idFicheTechniqueParent = req.query.idFicheTechniqueParent;
        const DatasheetJoin = await DatasheetJoinController.getDatasheetJoinByID(idFicheTechniqueParent)
        if (!DatasheetJoin) {
            return res.status(204).json({error:"Il n'y a rien dans la jointure"});
        }
        res.status(200).json(DatasheetJoin)
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des FicheTechniqueJointure"});
    }
});

router.post("/", async function (req, res, next) {
    try {
        await DatasheetJoinController.createDatasheetJoin(req.body)
        res.status(200).json({ message:  "Ajout effectué"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const idFicheTechniqueParent = req.query.idFicheTechniqueParent;
        const idFicheTechniqueFille = req.query.idFicheTechniqueFille;
        const datasheetJoinStatus = await DatasheetJoinController.deleteDatasheetJoin(idFicheTechniqueParent, idFicheTechniqueFille)
        if (!datasheetJoinStatus) {
            return res.status(400).json({error: "Aucune FicheTechniqueJointure avec ces id : il faut entrer idFicheTechniqueParent et idFicheTechniqueFille en paramètres de query"});
        }
        res.status(200).json({ message: "Suppresion effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const idFicheTechniqueParent = req.query.idFicheTechniqueParent;
        const idFicheTechniqueFille = req.query.idFicheTechniqueFille;
        const datasheetJoinStatus = await DatasheetJoinController.updateDatasheetJoin(idFicheTechniqueParent, idFicheTechniqueFille, req.body)
        if (!datasheetJoinStatus) {
            return res.status(400).json({error: "Aucune FicheTechniqueJointure avec ces id : il faut entrer idFicheTechniqueParent et idFicheTechniqueFille en paramètres de query"});
        }
        res.status(200).json({ message: "Modification effectuée"})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;
