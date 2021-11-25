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
const ingredientRoute = require("./routes/ingredientRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/author", authorRoute);
app.use("/ingredientsCat", ingredientCatRoute)
app.use("/allergenCat", allergenCatRoute)
app.use("/unite", uniteRoute)
app.use("/ingredient", ingredientRoute)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
