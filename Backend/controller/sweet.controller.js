import { Sweet } from "../Models/index.js";

export const addSweet = async (req, res) => {
  const { sweetData } = req.body;

  const existingSweet = await Sweet.findOne({ name: sweetData.name });

  if (existingSweet) {
    res.status(409).json({ success: false, message: "Sweet already exist..." });
    return;
  }

  const newSweet = new Sweet(sweetData);
  const result = await newSweet.save();

  if (result) {
    res
      .status(200)
      .json({ success: true, message: "Sweet added successfully..." });
  } else {
    res.status(500).json({ success: false, message: "Failed to add Sweet..." });
  }
};
