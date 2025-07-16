import { Owner } from "../Models/index.js";

export const ownerSignin = async (req, res) => {
  const { ownerData } = req.body;

  if (!ownerData) {
    res
      .status(404)
      .json({ success: false, message: "Please enter owner data..." });
    return;
  }

  const result = await Owner.findOne({
    email: ownerData.email,
    password: ownerData.password,
  });

  if (result) {
    res
      .status(200)
      .json({ success: true, message: "Signin successfully...", data: result });
  } else {
    res.status(401).json({ success: false, message: "UnAuthorized owner..." });
  }
};

export const ownerSignup = async (req, res) => {
  const { ownerData } = req.body;

  if (!ownerData) {
    sendResponse(400, "Enter the data for signup");
    return;
  }

  const existingOwner = await Owner.findOne({ email: ownerData.email });

  if (existingOwner) {
    res.status(409).json({ success: false, message: "Email already Exist..." });
    return;
  }

  const newOwner = new Owner(ownerData);
  const result = await newOwner.save();

  if (result) {
    res
      .status(200)
      .json({ success: true, message: "Owner Signup successfully" });
  } else {
    res.status(500).json({ success: false, message: "Failed to Signup" });
  }
};
