const express = require("express");
const foodPartnerRouter = express.Router();
const {
  registerFoodPartner,
  loginFoodPartner,
} = require("../controllers/foodPartnerAuth.controller");

foodPartnerRouter.post("/register", registerFoodPartner);
foodPartnerRouter.post("/login", loginFoodPartner);

module.exports = foodPartnerRouter;
