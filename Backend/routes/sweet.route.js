import express from "express";
import { getAllSweets, getSweet } from "../controller/index.js";

const router = express.Router({ mergeParams: true });

router.get("/all", getAllSweets);
router.get('/:sweetId', getSweet);

export default router;
