import { useNavigate } from "react-router-dom";
import UserHome from '../user/UserHome'

const OwnerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/owner/inventory/add")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Add Inventory
        </button>
      </div>

      <UserHome />
    </div>
  );
};

export default OwnerHome;
