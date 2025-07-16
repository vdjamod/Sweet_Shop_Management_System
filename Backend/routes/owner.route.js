import express from "express";
import {
  ownerSignin,
  updateSweet,
  ownerSignup,
  addSweet,
} from "../controller/index.js";

const router = express.Router({ mergeParams: true });

router.post("/signin", ownerSignin);
router.post("/signup", ownerSignup);
router.post("/sweet/add", addSweet);
router.put("/sweet/:sweetId/update", updateSweet);

export default router;
