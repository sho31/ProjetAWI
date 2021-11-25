require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3333;

/* ROUTES */
//const userRoute = require("./routes/dataSheetRoute");
const authorRoute = require("./routes/authorRoute");
const ingredientCatRoute = require("./routes/ingredientCatRoute");
const allergenCatRoute = require("./routes/allergenCatRoute");
const uniteRoute = require("./routes/uniteRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/author", authorRoute);
app.use("/catIngredients", ingredientCatRoute)
app.use("/catAllergenes", allergenCatRoute)
app.use("/unite", uniteRoute)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
