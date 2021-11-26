require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3333;

/* ROUTES */
//const userRoute = require("./routes/dataSheetRoute");
const authorRoute = require("./routes/authorRoute");
const ingredientCatRoute = require("./routes/ingredientCatRoute");
const allergenCatRoute = require("./routes/allergenCatRoute");
const uniteRoute = require("./routes/unitRoute");
const ingredientRoute = require("./routes/ingredientRoute");
const stepRoute = require("./routes/stepRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/author", authorRoute);
app.use("/ingredientsCat", ingredientCatRoute)
app.use("/allergenCat", allergenCatRoute)
app.use("/unite", uniteRoute)
app.use("/ingredient", ingredientRoute)
app.use("/step", stepRoute)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
