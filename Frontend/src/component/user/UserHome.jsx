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

  // const handleBuy = async (sweetId) => {
  //   console.log(sweetId);

  //   const res = await axios.post(`${BackendURL}/sweet/${sweetId}/buy`);
  // };

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Welcome to the Sweet Shop App
      </h1>

      {/* Filter & Sort Controls */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <input
          value={sortFilterOptions.name}
          onChange={(e) => changeSortFields("name", e.target.value)}
          type="text"
          placeholder="Enter sweet name"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs"
        />

        {/* Category */}
        <select
          defaultValue=""
          onChange={(e) => changeSortFields("category", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs"
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
          onChange={(e) => changeSortFields("sortBy", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="quantity">Quantity</option>
          <option value="name">Name</option>
        </select>

        {/* Sort Order */}
        <select
          defaultValue={0}
          onChange={(e) => changeSortFields("sort", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs"
        >
          <option value={0}>Sort Order</option>
          <option value={1}>Asc</option>
          <option value={-1}>Desc</option>
        </select>

        <input
          type="number"
          value={sortFilterOptions.min}
          onChange={(e) => changeSortFields("min", e.target.value)}
          placeholder="Min Price"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs"
        />

        <input
          type="number"
          // defaultValue={0}
          value={sortFilterOptions.max}
          onChange={(e) => changeSortFields("max", e.target.value)}
          placeholder={sortFilterOptions.max}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs"
        />

        <button
          onClick={handleSort}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sort
        </button>

        <button
          onClick={clearFilters}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Sweet Cards */}
      <div className="flex flex-wrap justify-start gap-6 pb-4 px-2">
        {sweets.map((sweet, idx) => (
          <div
            key={idx}
            className="min-w-[220px] max-w-[220px] bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <p className="text-lg font-semibold text-gray-700 mb-2">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserHome;
