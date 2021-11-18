require("dotenv").config();
const express = require("express");
const morgan = require("morgan")
const app = express();
app.use(morgan("tiny")); // Logger middleware
const port = process.env.PORT || 3333;

const auteurRoute = require("./routes/auteur");
app.use(express.json());
app.use("/auteur", auteurRoute);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
