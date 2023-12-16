import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/home") {
      (async function () {
        try {
          const access_token = localStorage.getItem("token");
          const homeReq = await fetch("/home", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          const homeRes = await homeReq.json();
          navigate(`${homeRes.route}`);
          console.log(homeRes);
        } catch (err) {
          console.error(err);
        }
      })();
    }
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location.pathname]);
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Home;
