import { Sweet } from "../Models/index.js";

export const getAllSweets = async (req, res) => {
  const sweets = await Sweet.find({});

  // Send 200 OK message as Sweet Get successfully
  res.status(200).json({ message: "Sweeet Get Successfully...", sweets });
};

export const getSweet = async (req, res) => {
  const { sweetId } = req.params;

  // Send 400 error If Sweet ID is not comes from frontend OR not found
  if (!sweetId) {
    res.status(404).json({ message: "Sweet Id NOT Found...." });
  }

  const sweet = await Sweet.findById(sweetId);

  // Send 200 OK message If Sweet Get Successfully otherwise send 404 Error Sweet NOT found
  if (sweet) {
    res.status(200).json({ message: "Sweet Get Successfully", sweet });
  } else {
    res.status(404).json({ message: "Sweet NOT Found" });
  }
};

export const deleteSweet = async (req, res) => {
  const { sweetId } = req.params;

  // Send 400 error If Sweet ID is not comes from frontend OR not found
  if (!sweetId) {
    res.status(404).json({ message: "Sweet ID not found..." });
  }

  const result = await Sweet.findByIdAndDelete(sweetId);

  // Send 400 error If Sweet is NOT found
  if (!result) {
    res.status(500).json({ message: "Sweet NOT Found" });
  }

  // Send 200 OK If Sweet Delete Successfully
  res.status(200).json({ messsage: "Sweet Delete successfully..." });
};

export const sweetSortFilter = async (req, res) => {
  const { sortFilterOptions } = req.body;

  const filterSweetConditions = [];

  // Filter using name
  if (sortFilterOptions.name) {
    filterSweetConditions.push({
      name: { $regex: `^${sortFilterOptions.name}`, $options: "i" }, // options for case insensitive
    });
  }

  // Filter using category
  if (sortFilterOptions.category != "") {
    filterSweetConditions.push({ category: sortFilterOptions.category });
  }

  // Filter using min, max salary
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

  // Filter using SortBy and Sort ASC and DESC
  if (sortFilterOptions.sortBy != "" && sortFilterOptions.sort != 0) {
    sortOption[sortFilterOptions.sortBy] = sortFilterOptions.sort;

    result = await Sweet.find({ $and: filterSweetConditions }).sort(sortOption);
  } else {
    result = await Sweet.find({ $and: filterSweetConditions });
  }

  // Send 200 OK message for Sort and Filter Successfully
  res
    .status(200)
    .json({ message: "Sort and Filter successfully", filteredSweets: result });
};
