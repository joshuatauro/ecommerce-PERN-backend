const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser")
require("dotenv").config();
const cors = require("cors")

const app = express();
app.use(morgan("dev"));
app.use(cors())
app.use(bodyParser.urlencoded({extended: false})) //this and next line is required so that when we send data via a request in the body, we are able to read it
app.use(bodyParser.json())

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./Routes/products.routes"))

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log("Server is up and running"));
