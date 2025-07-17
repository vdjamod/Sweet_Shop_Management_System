import express from "express";
import { userSignin, userSignup, buySweet } from "../controller/index.js";

const router = express.Router({ mergeParams: true });

router.post("/signin", userSignin);
router.post("/signup", userSignup);
router.post("/sweet/:sweetId/buy", buySweet);

export default router;
