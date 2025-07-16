import { Sweet } from "../Models/index.js";

export const getSweet = async (req, res) => {
  const sweets = await Sweet.find({});

  res.status(200).json({ message: "Sweeet Get Successfully...", sweets });
};
