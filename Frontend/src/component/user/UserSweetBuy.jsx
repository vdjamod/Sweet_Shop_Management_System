import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { BackendURL } from "../../../constants/constant";
import { useState } from "react";

function UserSweetBuy() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { sweetId } = useParams();
  const navigate = useNavigate();
  const [sweetData, setSweetData] = useState("");

  const getSweetData = async () => {
    console.log(sweetId);
    const res = await axios.get(`${BackendURL}/sweet/${sweetId}`);

    console.log(res.data.sweet);
    setSweetData(res.data.sweet);
    reset({ name: res.data.sweet.name });
  };
  useEffect(() => {
    getSweetData();
  }, []);

  const handleBuy = async (buyData) => {
    const res = await axios.post(
      `${BackendURL}/user/sweet/${sweetData._id}/buy`,
      {
        buyData,
      }
    );

    if(res.status == 200) {
      navigate('/home');
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Buy Sweets
          </h2>
          <form
            onSubmit={handleSubmit(handleBuy)}
            className="space-y-6 mb-4 mt-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="name"
                  disabled
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("name", { required: "name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Quantity
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="quantity"
                  type="quantity"
                  autoComplete="current-quantity"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("quantity", {
                    required: "quantity is required",
                    validate: (value) =>
                      parseInt(value) < sweetData.quantity ||
                      `Exceed available stock (${sweetData.quantity})`,
                  })}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.quantity.message}
                  </p>
                )}
                <span className="text-xs text-gray-500">
                  Available stock: {sweetData.quantity}
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Buy
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserSweetBuy;
