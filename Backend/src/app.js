require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const PORT = process.env.PORT || 3000;



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection is established!");
      console.log(`The app is sucessfully running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database can't be connected!`);
  });
