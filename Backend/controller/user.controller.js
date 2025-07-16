import { User } from "../Models/index.js";

export const userSignin = async (req, res) => {
  const { userData } = req.body;

  if (!userData) {
    res.status(404).json({ success: false, message: "data not found" });
    return;
  }

  const dbUser = await User.findOne({ email: userData.email });

  if (dbUser === null) {
    return res.status(404).json({
      success: false,
      message: "User not registered",
    });
  }

  const result = dbUser.password == userData.password;

  if (result) {
    res
      .status(200)
      .json({ success: true, message: "Signin successfully...", data: result });
  } else {
    res.status(401).json({ success: false, message: "UnAuthorized user..." });
  }
};

export const userSignup = async (req, res) => {
  const { userData } = req.body;

  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    res
      .status(409)
      .json({ success: false, message: "Email already registered..." });
    return;
  }

  if (!userData) {
    res
      .status(404)
      .json({ success: false, message: "Please enter valid user data..." });
    return;
  }

  const newUser = new User(userData);
  const result = await newUser.save();

  if (result) {
    res
      .status(200)
      .json({ success: true, message: "Signup successfully...", data: result });
  } else {
    res.status(500).json({ success: false, message: "Failed to signup" });
  }
};
