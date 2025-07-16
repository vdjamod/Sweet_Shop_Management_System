import express from "express";
import { userSignin, userSignup } from "../controller/index.js";

const router = express.Router({ mergeParams: true });

router.post("/signin", userSignin);
router.post("/signup", userSignup);

export default router;
