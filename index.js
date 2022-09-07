const express = require("express");
const mongoose = require("mongoose");

const mongoDbUri =
  "mongodb+srv://mongo:Password1@cluster0.siy14yc.mongodb.net/?retryWrites=true&w=majority";

const app = express();

mongoose
  .connect(mongoDbUri)
  .then(() => {
    console.log("Database connection is successful!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("Our server is up and running on port 5000");
});
