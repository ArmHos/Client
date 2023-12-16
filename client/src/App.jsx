import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import { useLocation, useNavigate, redirect } from "react-router-dom";
import { useEffect } from "react";
import Home from "./components/home/Home.jsx";

function App() {
  const nav = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/" && !localStorage.getItem("token")) {
      nav("/register", { replace: true });
    }
    if (location.pathname === "/" && localStorage.getItem("token")) {
      nav("/home", { replace: true });
    }
  }, [location.pathname]);
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>Error</div>} />
      </Routes>
    </div>
  );
}

export default App;
