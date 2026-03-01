require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth.route");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/user", authRouter);

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
