import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.scss";
const Register = () => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmpassRef = useRef(null);

  const [err, setError] = useState({
    email_err: "",
    pass_err: "",
    confirm_pass_err: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pass = passRef.current.value.trim();
      const confirmPass = confirmpassRef.current.value.trim();
      console.log(pass, "=----=", confirmPass);
      if (pass === confirmPass) {
        const resp = await fetch("/register", {
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
        console.log(data);
        if (data.msg.includes("mail")) {
          return setError((prev) => {
            return {
              ...prev,
              email_err: data.msg,
            };
          });
        }
        return navigate(data.route);
      }
      console.log("the password and confirm password should be the same");
      return setError((prev) => {
        return {
          ...prev,
          pass_err: "the password and confirm password should be the same",
          confirm_pass_err:
            "the password and confirm password should be the same",
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="register-email">
          <label>Email</label>
          <input
            id="email"
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
        <div className="register-password">
          <label>Password</label>
          <input
            id="password"
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
        </div>
        <div className="register-confirm-password">
          <label>Confirm password</label>
          <input
            id="confirm-password"
            type="password"
            required
            name="password"
            ref={confirmpassRef}
            onFocus={() => {
              setError((prev) => {
                return {
                  ...prev,
                  confirm_pass_err: "",
                };
              });
            }}
            className={err.confirm_pass_err ? `error` : ``}
          />
          {err.pass_err && <span style={{ color: "red" }}>{err.pass_err}</span>}
        </div>
        <button type="submit">Submit</button>
        <div className="register-login">
          <span>
            Already have an account ? <Link to="/login">Log in</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
