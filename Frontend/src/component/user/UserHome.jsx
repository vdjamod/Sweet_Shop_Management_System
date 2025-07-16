import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { BackendURL } from "../../../constants/constant";

function UserHome() {
  const [sweets, setSweets] = useState([]);

  async function getSweets() {
    const res = await axios.get(`${BackendURL}/sweet/all`);

    setSweets(res.data.sweets);
  }

  useEffect(() => {
    getSweets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to the Sweet Shop App
      </h1>

      <div className="flex overflow-x-auto gap-4">
        {sweets.map((s, idx) => (
          <div
            key={idx}
            className="min-w-[200px] max-w-[200px] border p-4 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-300"
          >
            <p className="text-lg font-semibold text-pink-600">{s.name}</p>
            <p className="text-sm">
              <span className="font-semibold">Price:</span> ₹{s.price}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Category:</span> {s.category}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Quantity:</span> {s.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserHome;
