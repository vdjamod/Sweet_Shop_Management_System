import express from "express";
import {
  getAllSweets,
  getSweet,
  sweetSortFilter,
  deleteSweet,
} from "../controller/index.js";

const router = express.Router({ mergeParams: true });

router.post("/sort-filter", sweetSortFilter);
router.get("/all", getAllSweets);
router.get("/:sweetId", getSweet);
router.delete("/:sweetId", deleteSweet);

export default router;
