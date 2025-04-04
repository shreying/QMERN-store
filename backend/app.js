const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn.js");
const user = require("./routes/user.js");



//routes
app.use("/api/v1", user);


app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});