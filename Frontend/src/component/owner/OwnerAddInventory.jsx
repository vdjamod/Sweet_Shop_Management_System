import React from "react";
import { useForm } from "react-hook-form";
import { BackendURL } from "../../../constants/constant";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OwnerAddInventory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);

  async function getSweets() {
    const res = await axios.get(`${BackendURL}/sweet/all`);

    setSweets(res.data.sweets);
  }

  useEffect(() => {
    getSweets();
  }, []);

  const handleAddInventory = async (inventoryData) => {
    console.log(inventoryData);

    const res = await axios.post(`${BackendURL}/owner/sweet/inventory/update`, {
      inventoryData,
    });

    if(res.status == 200) {
      navigate('/owner');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
        Update Inventory
      </h2>
      <form onSubmit={handleSubmit(handleAddInventory)} className="space-y-6">
        {sweets.length > 0 &&
          sweets.map((sweet, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={`sweet-${index}`}
                className="text-gray-700 font-medium"
              >
                {sweet.name}
              </label>

              <input
                id={`sweet-${index}`}
                type="number"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                {...register(`${sweet.name}`, {
                  required: "Quantity is required",
                })}
              />

              {errors[sweet.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[sweet.name]?.message}
                </p>
              )}

              <span className="text-sm text-gray-600">
                Available stock: {sweet.quantity}
              </span>
            </div>
          ))}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200">
          Submit
        </button>
      </form>
    </div>
  );
}

export default OwnerAddInventory;
