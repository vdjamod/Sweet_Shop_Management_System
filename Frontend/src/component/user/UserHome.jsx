import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { BackendURL } from "../../../constants/constant";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserHome() {
  const [sweets, setSweets] = useState([]);
  const [refreshFlag, setIsRefreshFlag] = useState(false);
  const [uniqueCategory, setUniqueCategory] = useState([]);

  const [sortFilterOptions, setSortFilterOptions] = useState({
    name: "",
    category: "",
    sortBy: "",
    sort: 0,
    min: 0,
    max: 1000000,
  });

  const navigate = useNavigate();

  // Function to get All sweet from Backend
  async function getSweets() {
    const res = await axios.get(`${BackendURL}/sweet/all`);

    setSweets(res.data.sweets);
    setUniqueCategory([
      ...new Set(res.data.sweets.map((sweet) => sweet.category)),
    ]);
  }

  useEffect(() => {
    getSweets();
  }, [refreshFlag]);

  const changeSortFields = (field, value) => {
    setSortFilterOptions((prev) => ({ ...prev, [field]: value }));
  };

  const handleBuy = async (sweetId) => {
    console.log(sweetId);

    navigate(`/user/sweet/${sweetId}/buy`);
  };

  const handleDelete = async (sweetId) => {
    const res = await axios.delete(`${BackendURL}/sweet/${sweetId}`);

    if (res.status == 200) {
      setIsRefreshFlag(true);
    }
  };

  const handleSort = async () => {
    const res = await axios.post(`${BackendURL}/sweet/sort-filter`, {
      sortFilterOptions,
    });

    setSweets(res.data.filteredSweets);
  };

  const clearFilters = () => {
    setSortFilterOptions({
      name: "",
      category: "",
      sortBy: "",
      sort: 0,
      min: 0,
      max: 1000000,
    });

    setIsRefreshFlag(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Welcome to the Sweet Shop App
        </h1>

        {/* Filter & Sort Controls */}
        <div className="w-full bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-10">
          <div className="flex flex-wrap gap-4 items-end">
            {/* Sweet Name */}
            <input
              value={sortFilterOptions.name}
              onChange={(e) => changeSortFields("name", e.target.value)}
              type="text"
              placeholder="Enter sweet name"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-xs"
            />

            {/* Category */}
            <select
              defaultValue=""
              value={sortFilterOptions.category}
              onChange={(e) => changeSortFields("category", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-xs"
            >
              <option value="">Select category</option>
              {uniqueCategory.map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              defaultValue=""
              value={sortFilterOptions.sortBy}
              onChange={(e) => changeSortFields("sortBy", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-xs"
            >
              <option value="">Sort By</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
              <option value="name">Name</option>
            </select>

            {/* Sort Order */}
            <select
              defaultValue={0}
              value={sortFilterOptions.sort}
              onChange={(e) => changeSortFields("sort", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-xs"
            >
              <option value={0}>Sort Order</option>
              <option value={1}>Asc</option>
              <option value={-1}>Desc</option>
            </select>

            {/* Min Price */}
            <input
              type="number"
              value={sortFilterOptions.min}
              onChange={(e) => changeSortFields("min", e.target.value)}
              placeholder="Min Price"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-xs"
            />

            {/* Max Price */}
            <input
              type="number"
              value={sortFilterOptions.max}
              onChange={(e) => changeSortFields("max", e.target.value)}
              placeholder="Max Price"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-xs"
            />

            {/* Buttons */}
            <button
              onClick={handleSort}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 shadow-sm transition w-full sm:w-auto"
            >
              Sort
            </button>

            <button
              onClick={clearFilters}
              className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 shadow-sm transition w-full sm:w-auto"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Sweet Cards */}
        <div className="flex flex-wrap justify-start gap-6 pb-4 px-2">
          {sweets.map((sweet, idx) => (
            <div
              key={idx}
              className="min-w-[220px] max-w-[220px] bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            >
              <p className="text-lg font-semibold text-gray-800 mb-2">
                {sweet.name}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Price:</span> ₹{sweet.price}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Category:</span> {sweet.category}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Quantity:</span> {sweet.quantity}
              </p>

              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between gap-2 text-sm">
                  <Link
                    to={`/owner/sweet/${sweet._id}/update`}
                    className="text-blue-600 hover:underline"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(sweet._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>

                <button
                  onClick={() => handleBuy(sweet._id)}
                  className="mt-1 bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-800 transition"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserHome;
