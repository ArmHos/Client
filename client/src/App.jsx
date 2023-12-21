import { Route, Routes } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import { ROUTER } from "./router/router.js";

import "./App.css";
import ErrorPage from "./pages/ErrorPage.jsx";

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
        <Route path={ROUTER.HOME_PAGE_ROUTE} element={<HomePage />} />
        <Route path={ROUTER.REGISTER_PAGE_ROUTE} element={<RegisterPage />} />
        <Route path={ROUTER.LOGIN_PAGE_ROUTE} element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
