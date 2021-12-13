require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
const cors = require('cors')
app.use(cors());
/* ROUTES */
//const userRoute = require("./routes/dataSheetRoute");
const authorRoute = require("./routes/authorRoute");
const ingredientCatRoute = require("./routes/ingredientCatRoute");
const allergenCatRoute = require("./routes/allergenCatRoute");
const unitRoute = require("./routes/unitRoute");
const ingredientRoute = require("./routes/ingredientRoute");
const stepRoute = require("./routes/stepRoute");
const datasheetCatRoute = require("./routes/datasheetCatRoute")
const datasheetRoute = require("./routes/datasheetRoute");
const datasheetJoinRoute = require("./routes/datasheetJoinRoute");
const ingredientStepRoute = require("./routes/ingredientStepJoinRoute")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/author", authorRoute);
app.use("/ingredientCat", ingredientCatRoute);
app.use("/allergenCat", allergenCatRoute);
app.use("/unit", unitRoute);
app.use("/ingredient", ingredientRoute);
app.use("/step", stepRoute);
app.use("/datasheetCat", datasheetCatRoute);
app.use("/datasheet", datasheetRoute);
app.use("/datasheetJoin", datasheetJoinRoute);
app.use("/ingredientStepJoin", ingredientStepRoute);
app.use("/", (req, res) => {res.send("Please select a correct route")});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
