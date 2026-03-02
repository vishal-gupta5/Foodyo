const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing!", success: false });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exist!", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User Created successfully!",
      data: user,
      success: true,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
};

// Login User

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Somethine is missing!", success: false });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password!", success: false });
    }

    const decodePassword = await bcrypt.compare(password, user.password);

    if (!decodePassword) {
      return res
        .status(400)
        .json({ message: "Invalid Password!", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User Logged in successfully!",
      data: user,
      success: true,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
};

// Logout User

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
