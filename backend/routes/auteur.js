const express = require("express");
const router = express.Router();

/* All controllers */

const auteurController = require("../controllers/auteur");
const auteurModel = require("../models/auteur");

router.get("/all", async function (req, res, next) {
    try {
        const allAutors = await auteurModel.getAllAutors();
        res.status(200).json({
            status : "success",
            results : allAutors.length,
            data : {
                autors : allAutors
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "can't load data" });
    }
});
router.get("/");

module.exports = router;
