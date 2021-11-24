const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");

router.get("/", async function (req, res, next) {
    try {
        const author = await authorController.getAllAuthors();
        res.status(200).json({ message: author})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/:id", async function (req, res, next) {
    try {
        const idAuthor = req.params.id;
        const author = await authorController.getAuthorByID(idAuthor)
        if (!author) {
            return res.status(400).json({error: "Aucun auteur"});
        }
        res.status(200).json({ message: author})
    } catch (e) {
        return res.status(500).json({error: "Impossible d'accéder à la liste des auteurs"});
    }
});

router.post("/add", async function (req, res, next) {
    try {
        const author = await authorController.createAuthor(req.body)
        res.status(200).json({ message: author})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.delete("/delete/:id", async function (req, res, next) {
    try {
        const idAuthor = req.params.id;
        const author = await authorController.deleteAuthor(idAuthor)
        res.status(200).json({ message: author})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.put("/:id", async function (req, res, next) {
    try {
        const idAuthor = req.params.id;
        const author = await authorController.updateAuthor(idAuthor, req.body)
        res.status(200).json({ message: author})
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
module.exports = router;