import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import UserDashboard from "./components/dashboard/UserDashboard";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/dashboard" element={<UserDashboard></UserDashboard>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
