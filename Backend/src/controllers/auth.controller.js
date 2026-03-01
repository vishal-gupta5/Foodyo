const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing!", success: false });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    const token = await jwt.sign(user._id, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true });

    return res
      .status(201)
      .json({ message: "User created succesfully!", data: user });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { register };
