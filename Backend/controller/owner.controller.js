import mongoose from "mongoose";
import { Owner, Sweet } from "../Models/index.js";

export const ownerSignin = async (req, res) => {
  const { ownerData } = req.body;

  // Send 404 error If ownerData is not comes from frontend OR not found
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

  // Send 200 OK message If Signin successfully Done
  if (result) {
    res
      .status(200)
      .json({ success: true, message: "Signin successfully...", data: result });
  } else {
    // Send 401 If User UnAuthorized owner
    res.status(401).json({ success: false, message: "UnAuthorized owner..." });
  }
};

export const ownerSignup = async (req, res) => {
  const { ownerData } = req.body;

  // Send 404 error If ownerData is not comes from frontend
  if (!ownerData) {
    sendResponse(400, "Enter the data for signup");
    return;
  }

  const existingOwner = await Owner.findOne({ email: ownerData.email });

  // Send 409 error if Owner is already registered with that email
  if (existingOwner) {
    res.status(409).json({ success: false, message: "Email already Exist..." });
    return;
  }

  const newOwner = new Owner(ownerData);
  const result = await newOwner.save();

  // Send 200 OK message If credentials of Owner is match else throw 500 error for Failed Signup
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

  // Send 409 error if Sweet is already registered with that name
  if (existingSweet) {
    res.status(409).json({ success: false, message: "Sweet already exist..." });
    return;
  }

  const newSweet = new Sweet(sweetData);
  const result = await newSweet.save();

  // Send 200 OK message If Sweet is match else throw 500 error for Failed to add Sweet
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

  // Sent 404 Error If Sweet ID is not comes from the frontend OR not found
  if (!sweetId) {
    res.status(404).json({ message: "Sweet ID not found..." });
    return;
  }

  const result = await Sweet.findByIdAndUpdate(sweetId, sweetData, {
    new: true,
  });

  // Send 200 OK message If Sweet is match and update else throw 500 error for Failed to update Sweet
  if (!result) {
    res.status(500).json({ message: "Failed to update Sweet..." });
    return;
  }

  // Send 200 OK message If Sweet Update successfully
  res.status(200).json({ message: "Sweet updated successfully...", result });
};

export const addInventory = async (req, res) => {
  const { inventoryData } = req.body;

  for (const key in inventoryData) {
    await Sweet.findOneAndUpdate(
      { name: key },
      { $inc: { quantity: parseInt(inventoryData[key]) } }
    );
  }

  // Send 200 OK message If Inventory update successfully
  res.status(200).json({ message: "Inventory Updated Successfully" });
};
