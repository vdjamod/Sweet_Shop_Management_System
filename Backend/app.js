import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Import all route handlers
import { ownerRouter, userRouter, sweetRouter } from "./routes/index.js";

// Connect to MongoDB database
main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  // Connect to the MongoDB instance running locally
  await mongoose.connect("mongodb://127.0.0.1:27017/Sweet_Management");
}

// Initialize express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route to confirm server is up
app.get("/", (req, res) => {
  res.send("Sweet Shop");
});

// Define CORS options to allow requests from  localhost:5173
const corsOption = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true,
};

// Apply CORS settings
app.use(cors(corsOption));

// Route Handler
app.use("/owner", ownerRouter);
app.use("/user", userRouter);
app.use("/sweet", sweetRouter);

// Start Server
if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Server is listening..");
  });
}

export { app };
