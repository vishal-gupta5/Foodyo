const express = require("express");
const foodPartnerRouter = express.Router();
const {
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
} = require("../controllers/foodPartnerAuth.controller");

foodPartnerRouter.post("/register", registerFoodPartner);
foodPartnerRouter.post("/login", loginFoodPartner);
foodPartnerRouter.post("/logout", logoutFoodPartner);

module.exports = foodPartnerRouter;
