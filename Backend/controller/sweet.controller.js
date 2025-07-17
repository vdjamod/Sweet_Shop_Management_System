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

export const deleteSweet = async (req, res) => {
  const { sweetId } = req.params;

  if (!sweetId) {
    res.status(404).json({ message: "Sweet ID not found..." });
  }

  const result = await Sweet.findByIdAndDelete(sweetId);

  if (!result) {
    res.status(500).json({ message: "Sweet NOT Found" });
  }

  res.status(200).json({ messsage: "Sweet Delete successfully..." });
};

export const sweetSortFilter = async (req, res) => {
  const { sortFilterOptions } = req.body;

  const filterSweetConditions = [];

  if (sortFilterOptions.name) {
    filterSweetConditions.push({
      name: { $regex: `^${sortFilterOptions.name}`, $options: "i" }, // options for case insensitive
    });
  }

  if (sortFilterOptions.category != "") {
    filterSweetConditions.push({ category: sortFilterOptions.category });
  }

  const min = parseInt(sortFilterOptions.min);
  const max = parseInt(sortFilterOptions.max);
  filterSweetConditions.push({
    price: {
      $gte: min,
      $lte: max,
    },
  });

  let result = null;

  const sortOption = {};

  sortFilterOptions.sort = parseInt(sortFilterOptions.sort); // TO parse int

  if (sortFilterOptions.sortBy != "" && sortFilterOptions.sort != 0) {
    sortOption[sortFilterOptions.sortBy] = sortFilterOptions.sort;

    result = await Sweet.find({ $and: filterSweetConditions }).sort(sortOption);
  } else {
    result = await Sweet.find({ $and: filterSweetConditions });
  }

  res
    .status(200)
    .json({ message: "Sort and Filter successfully", filteredSweets: result });
};

export const buySweet = async (req, res) => {
  const { sweetId } = req.params;
};
