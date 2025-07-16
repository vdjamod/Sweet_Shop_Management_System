import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { BackendURL } from "../../../constants/constant";
import { Link } from "react-router-dom";

function UserHome() {
  const [sweets, setSweets] = useState([]);

  async function getSweets() {
    const res = await axios.get(`${BackendURL}/sweet/all`);

    setSweets(res.data.sweets);
  }

  useEffect(() => {
    getSweets();
  }, []);

  const handleDelete = async (sweetId) => {
    const res = await axios.delete(`${BackendURL}/sweet/${sweetId}`);

    if(res.status == 200) {
      console.log("Delete Successfully");
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Welcome to the Sweet Shop App
      </h1>

      <div className="flex overflow-x-auto gap-6 pb-4 px-2">
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
              <Link
                // to={`/sweet/${sweet._id}/delete`}
                onClick={() => handleDelete(sweet._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserHome;
