const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const productRoute = require("./routes/product");
const userRoute = require("./routes/auth");
const cors = require("cors");

const app = express();

/** connecting our database with our app */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connection is successful!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);

/** setting up server */
app.listen(5000, () => {
  console.log("Our server is up and running on port 5000");
});
