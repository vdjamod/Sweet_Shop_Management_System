import express from "express";
import { ownerSignin, ownerSignup, addSweet } from "../controller/index.js";

const router = express.Router({ mergeParams: true });

router.post("/signin", ownerSignin);
router.post("/signup", ownerSignup);
router.post("/sweet/add", addSweet);

export default router;
