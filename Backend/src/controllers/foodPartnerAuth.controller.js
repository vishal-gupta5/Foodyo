const FoodPartnerModel = require("../models/foodPartner.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register FoodPartner

const registerFoodPartner = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing!", success: false });
    }

    const existingUser = await FoodPartnerModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "FoodPartner Already exists!", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const foodPartner = await FoodPartnerModel.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { id: foodPartner._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "FoodPartner Created successfully!",
      data: foodPartner,
      success: false,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

// Login FoodPartner

const loginFoodPartner = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "something is missing!", success: false });
    }

    const foodParther = await FoodPartnerModel.findOne({ email });
    if (!foodParther) {
      return res
        .status(400)
        .json({ message: "Invalid Food Partner", success: false });
    }

    const decodePassword = await bcrypt.compare(password, foodParther.password);

    if (!decodePassword) {
      return res
        .status(400)
        .json({ message: "Invalid email or password!", success: false });
    }

    const token = jwt.sign(
      { id: foodParther._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: false,
      maxAge: 23 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Food partner Logged in successfully!",
      data: foodParther,
      success: true,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
};

// Logout FoodPartner

const logoutFoodPartner = async (req, res) => {
  try {
    res.clearCookie("token", {
      sameSite: true,
      secure: false,
    });

    return res
      .status(200)
      .json({
        message: "Food Partner Logged out successfully!",
        success: true,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went Wrong!", success: false });
  }
};

module.exports = { registerFoodPartner, loginFoodPartner, logoutFoodPartner };
