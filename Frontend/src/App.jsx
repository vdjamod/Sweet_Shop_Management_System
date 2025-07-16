import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Owner
import OwnerHome from "./component/owner/OwnerHome.jsx";
import OwerSignin from "./component/owner/OwerSignin";
import OwnerSignup from "./component/owner/OwnerSignup.jsx";

//User
import UserSignup from "./component/user/UserSignup";
import UserSignin from "./component/user/UserSignin";
import UserHome from "./component/user/UserHome.jsx";

//Utils
import Home from "./Home.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/owner/signin" element={<OwerSignin />} />
          <Route path="/owner/signup" element={<OwnerSignup />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/signin" element={<UserSignin />} />
          <Route path="/owner" element={<OwnerHome />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
