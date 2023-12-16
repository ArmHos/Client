import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.scss";

const Login = () => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const [err, setError] = useState({
    email_err: "",
    pass_err: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passRef.current.value,
        }),
      });
      const data = await resp.json();
      if (data.msg.includes("email")) {
        // return setEmailErr(data.msg);
        return setError((prev) => {
          return {
            ...prev,
            email_err: data.msg,
          };
        });
      }
      if (data.msg.includes("password")) {
        return setError((prev) => {
          return {
            ...prev,
            pass_err: data.msg,
          };
        });
      }
      const { access_token } = data;
      localStorage.setItem("token", access_token);
      navigate(`/home`);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-email">
          <label>Email</label>
          <input
            type="email"
            required
            name="email"
            ref={emailRef}
            onFocus={() => {
              setError((prev) => {
                return {
                  ...prev,
                  email_err: "",
                };
              });
            }}
            className={err.email_err ? `error` : ``}
          />
          {err.email_err && (
            <span style={{ color: "red" }}>{err.email_err}</span>
          )}
        </div>
        <div className="login-password">
          <label>Password</label>
          <input
            type="password"
            required
            name="password"
            ref={passRef}
            onFocus={() => {
              setError((prev) => {
                return {
                  ...prev,
                  pass_err: "",
                };
              });
            }}
            className={err.pass_err ? `error` : ``}
          />
          {err.pass_err && <span style={{ color: "red" }}>{err.pass_err}</span>}
        </div>
        <button type="submit">Login</button>
        <div className="login-register">
          <span>
            Don't have an account ? <Link to="/register">Sign up</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
