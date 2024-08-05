// backend/index.js
const express = require("express");
const bodyParser = require("body-parser");
const elasticClient = require("./elastic-client");
require("express-async-errors");

const app = express();

app.use(bodyParser.json());
app.use(elasticClient);

app.get("/home", (req, res) => {
    res.redirect("http://localhost:/home");
});
// Express routes

app.listen(8080,()=>{
    console.log("app listening")
});