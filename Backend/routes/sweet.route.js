import express from "express";
import { getAllSweets, getSweet, deleteSweet } from "../controller/index.js";

const router = express.Router({ mergeParams: true });

router.get("/all", getAllSweets);
router.get("/:sweetId", getSweet);
router.delete("/:sweetId", deleteSweet);

export default router;
