import {
  ownerSignin,
  addSweet,
  updateSweet,
  ownerSignup,
} from "./owner.controller.js";
import { userSignin, userSignup } from "./user.controller.js";
import { getAllSweets, getSweet } from "./sweet.controller.js";

export {
  ownerSignin,
  ownerSignup,
  getSweet,
  updateSweet,
  userSignin,
  userSignup,
  addSweet,
  getAllSweets,
};
