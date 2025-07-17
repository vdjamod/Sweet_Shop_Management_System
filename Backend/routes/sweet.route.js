import express from "express";
import {
  getAllSweets,
  getSweet,
  buySweet,
  sweetSortFilter,
  deleteSweet,
} from "../controller/index.js";

const router = express.Router({ mergeParams: true });

router.post("/sort-filter", sweetSortFilter);
router.get("/all", getAllSweets);
router.get("/:sweetId", getSweet);
router.delete("/:sweetId", deleteSweet);
router.post("/:sweetId/buy", buySweet);

export default router;
