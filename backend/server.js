require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
const pool = require("./dataBase/index");

/* ROUTES */
//const userRoute = require("./routes/dataSheetRoute");
const authorRoute = require("./routes/authorRoute");
const ingredientCatRoute = require("./routes/ingredientCatRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/menus", authorRoute);
app.use("/catIngredients", ingredientCatRoute)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
