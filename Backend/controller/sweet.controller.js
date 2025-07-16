import { Sweet } from "../Models/index.js";

export const getAllSweets = async (req, res) => {
  const sweets = await Sweet.find({});

  res.status(200).json({ message: "Sweeet Get Successfully...", sweets });
};

export const getSweet = async (req, res) => {
  const { sweetId } = req.params;

  if (!sweetId) {
    res.status(400).json({ message: "Sweet Id NOT Found...." });
  }

  const sweet = await Sweet.findById(sweetId);

  if (sweet) {
    res.status(200).json({ message: "Sweet Get Successfully", sweet });
  } else {
    res.status(404).json({ message: "Sweet NOT Found" });
  }
};
