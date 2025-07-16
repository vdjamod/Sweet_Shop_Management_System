import express from "express";
import { ownerSignin, ownerSignup } from "../controller/index.js";

const router = express.Router({ mergeParams: true });

router.post("/signin", ownerSignin);
router.post("/signup", ownerSignup);

export default router;
