import express from "express";
import cors from "cors";
import { User, Owner, Sweet } from "./Models/index.js";
import { sendResponse } from "./utils/index.js";
import mongoose from "mongoose";

//router
import { ownerRouter, userRouter, sweetRouter } from "./routes/index.js";

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

app.use("/owner", ownerRouter);
app.use("/user", userRouter);
app.use('/sweet', sweetRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Server is listening..");
  });
}

export { app };
