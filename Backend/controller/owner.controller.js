import mongoose from "mongoose";
import { Owner, Sweet } from "../Models/index.js";

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

export const addSweet = async (req, res) => {
  const { sweetData } = req.body;

  const existingSweet = await Sweet.findOne({ name: sweetData.name });

  if (existingSweet) {
    res.status(409).json({ success: false, message: "Sweet already exist..." });
    return;
  }

  const newSweet = new Sweet(sweetData);
  const result = await newSweet.save();

  if (result) {
    res
      .status(200)
      .json({ success: true, message: "Sweet added successfully..." });
  } else {
    res.status(500).json({ success: false, message: "Failed to add Sweet..." });
  }
};

export const updateSweet = async (req, res) => {
  const { sweetId } = req.params;
  const { sweetData } = req.body;

  if (!sweetId) {
    res.status(404).json({ message: "Sweet ID not found..." });
    return;
  }

  const result = await Sweet.findByIdAndUpdate(sweetId, sweetData, {
    new: true,
  });

  if (!result) {
    res.status(500).json({ message: "Failed to update Sweet..." });
    return;
  }

  res.status(200).json({ message: "Sweet updated successfully...", result });
};
