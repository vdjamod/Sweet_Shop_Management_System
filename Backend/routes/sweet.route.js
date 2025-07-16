import express from "express";
import { addSweet } from "../controller/index.js";

const router = express.Router({ mergeParams: true });

router.post("/add", addSweet);

export default router;
