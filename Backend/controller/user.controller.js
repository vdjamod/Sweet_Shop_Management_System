import { Sweet, User } from "../Models/index.js";

export const userSignin = async (req, res) => {
  const { userData } = req.body;

  // Send 404 error If userData NOT found
  if (!userData) {
    res.status(404).json({ success: false, message: "data not found" });
    return;
  }

  const dbUser = await User.findOne({ email: userData.email });

  // Send 404 Error If user NOT found in database
  if (dbUser === null) {
    return res.status(404).json({
      success: false,
      message: "User not registered",
    });
  }

  const result = dbUser.password == userData.password;

  // Send 200 OK message If Signin successfully otherwise send 401 error as UnAuthorized user
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

  // Send 409 error If Email already registered
  if (existingUser) {
    res
      .status(409)
      .json({ success: false, message: "Email already registered..." });
    return;
  }

  // Send 404 error If Enter Valid User Data
  if (!userData) {
    res
      .status(404)
      .json({ success: false, message: "Please enter valid user data..." });
    return;
  }

  const newUser = new User(userData);
  const result = await newUser.save();

  // Send 200 OK message If Signup successfully otherwise send 500 error if Signup Failed
  if (result) {
    res
      .status(200)
      .json({ success: true, message: "Signup successfully...", data: result });
  } else {
    res.status(500).json({ success: false, message: "Failed to signup" });
  }
};

export const buySweet = async (req, res) => {
  const { sweetId } = req.params;
  const { buyData } = req.body;

  const s = await Sweet.findById(sweetId);

  // Send 500 error as Quantity is not enough provided by user
  if (s.quantity == buyData.quantity) {
    res.status(500).json({ message: "Quantity is not enough" });
    return;
  }

  const sweet = await Sweet.findByIdAndUpdate(
    sweetId,
    { $inc: { quantity: -Number(buyData.quantity) } },
    { new: true }
  );

  // Send 500 error If Failed to Buy Sweet
  if (!sweet) {
    res.status(500).json({ message: "Failed to Buy Sweet" });
  }

  // Send 200 OK message If Sweet Buy successfully
  res.status(200).json({ message: "Sweet Buy succesfully..." });
};
