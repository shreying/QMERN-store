const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn.js");
const user = require("./routes/user.js");
const Books = require("./routes/book.js");
const Favourite = require("./routes/favourite.js");
const Cart = require("./routes/cart.js");
const Order = require("./routes/order.js");



//routes
app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);


app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});