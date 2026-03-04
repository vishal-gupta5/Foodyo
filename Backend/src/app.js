require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth.route");
const foodPartnerRouter = require("./routes/foodParther.route");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/user", authRouter);
app.use("/foodPartner", foodPartnerRouter);

connectDB()
  .then(() => {
    console.log("Database Connection is established!");
    app.listen(PORT, () => {
      console.log(`Server is successfully running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database can't be connected!");
  });
