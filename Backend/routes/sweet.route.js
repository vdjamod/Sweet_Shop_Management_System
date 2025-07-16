import express from "express";
import { getSweet } from "../controller/index.js";

const router = express.Router({ mergeParams: true });

router.get("/all", getSweet);

export default router;
