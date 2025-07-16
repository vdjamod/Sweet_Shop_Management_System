import express from "express";
import cors from "cors";
import { User, Owner, Sweet } from "./Models/index.js";
import { sendResponse } from "./utils/index.js";
import mongoose from "mongoose";

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Sweet_Management");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Sweet Shop");
});

const corsOption = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOption));

app.post("/owner/signup", async (req, res) => {
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
});

app.post("/owner/signin", async (req, res) => {
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
});

///////////////////////////////////////////////////////////////////////////////////////////

app.post("/user/signup", async (req, res) => {
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
    res.status(200).json({ success: true, message: "Signup successfully..." });
  } else {
    res.status(500).json({ success: false, message: "Failed to signup" });
  }
});

app.post("/user/signin", async (req, res) => {
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
    res.status(200).json({ success: true, message: "Signin successfully..." });
  } else {
    res.status(401).json({ success: false, message: "UnAuthorized user..." });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Server is listening..");
  });
}

export { app };
