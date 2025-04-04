const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn.js");


const mongoose = require("mongoose");

//
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});