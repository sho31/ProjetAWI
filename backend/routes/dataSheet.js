const express = require("express");
const router = express.Router();

/* All controllers */

const dataSheetController = require("../controllers/dataSheetController");

router.get("/", async function (req, res, next) {
  try {
    const dataSheet = await dataSheetController.getDataSheet();
    res.send(dataSheet);
  } catch (e) {
    res.status(500).json({ message: "can't load data" });
  }
});

module.exports = router;
