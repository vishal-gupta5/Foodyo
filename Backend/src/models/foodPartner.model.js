const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const FoodPartnerModel = mongoose.model("FoodPartner", foodPartnerSchema);
module.exports = FoodPartnerModel;
