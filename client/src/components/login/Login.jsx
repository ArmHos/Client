import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.scss";
import FormInputs from "../form-inputs/FormInputs";

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

  const setErrorsToDefault = () => {
    setError(() => {
      return {
        email_err: "",
        pass_err: "",
      };
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <FormInputs
            name={"email"}
            type={"email"}
            reference={emailRef}
            errorHandler={setErrorsToDefault}
            errorType={err.email_err}
          />
          <FormInputs
            name={"password"}
            type={"password"}
            reference={passRef}
            errorHandler={setErrorsToDefault}
            errorType={err.pass_err}
          />
          <button type="submit">Login</button>
          <div className="login-register">
            <span>
              Don't have an account ? <Link to="/register">Sign up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
