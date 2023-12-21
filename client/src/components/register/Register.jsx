import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.scss";
import FormInputs from "../form-inputs/FormInputs";
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

      return setError((prev) => {
        return {
          ...prev,
          pass_err: "The password and confirm password should be the same",
          confirm_pass_err:
            "The password and confirm password should be the same",
        };
      });
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
    <div className="register-wrapper">
      <div className="register">
        <h2>Create an Account</h2>
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
          <FormInputs
            name={"confirm password"}
            type={"password"}
            reference={confirmpassRef}
            errorHandler={setErrorsToDefault}
            errorType={err.confirm_pass_err}
          />
          <button type="submit">Submit</button>
          <div className="register-login">
            <span>
              Already have an account ? <Link to="/login">Log in</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
