import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Owner
import OwnerHome from "./component/owner/OwnerHome.jsx";
import OwerSignin from "./component/owner/OwerSignin";
import OwnerSignup from "./component/owner/OwnerSignup.jsx";

//User
import UserSignup from "./component/user/UserSignup";
import UserSignin from "./component/user/UserSignin";
import UserHome from "./component/user/UserHome.jsx";
import OwnerUpdateSweet from "./component/owner/OwnerUpdateSweet.jsx";
import OwnerAddInventory from "./component/owner/OwnerAddInventory.jsx";

//Utils
import Home from "./Home.jsx";
import OwnerAddSweet from "./component/owner/OwnerAddSweet.jsx";
import UserSweetBuy from "./component/user/UserSweetBuy.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/owner/signin" element={<OwerSignin />} />
          <Route path="/owner/signup" element={<OwnerSignup />} />
          <Route path="/owner/inventory/add" element={<OwnerAddInventory />} />
          <Route path="/owner/sweet/add" element={<OwnerAddSweet />} />
          <Route
            path="/owner/sweet/:sweetId/update"
            element={<OwnerUpdateSweet />}
          />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/signin" element={<UserSignin />} />
          <Route path="/owner" element={<OwnerHome />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/user/sweet/:sweetId/buy" element={<UserSweetBuy />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
