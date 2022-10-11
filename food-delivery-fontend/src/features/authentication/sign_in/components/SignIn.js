import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import { CgProfile, CgLock } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import authenSlide from "./../../../../redux";
import { signin } from "../../../../redux/authenSlice";
import { ROUTES } from "./../../../../context/routes";
import "./SignIn.scss";
import { validateInput } from "../../../../helpers";
import signin_logo from "./../../../../assets/images/signin_logo.png";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authenState = useSelector((state) => state.authen);
  useEffect(() => {
    if (authenState?.token) {
      console.log(authenState.token);
      navigate("/");
    }
  }, [authenState.token]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="signin-logo-container">
          <img className="logo" src={signin_logo} />
        </div>
        <div className="inner-container">
          <h2>Sign In</h2>
          <div className="input-group">
            <CgProfile className="icon" />
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="field"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-group">
            <CgLock className="icon" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="field"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button
            onClick={() => {
              const usernameRes = validateInput({
                name: "Username",
                value: username,
                regex: /[a-zA-Z0-9]/,
                regexMessage: "characters from a-z, A-Z, 0-9",
              });
              const passwordRes = validateInput({
                name: "Password",
                value: password,
                regex: /^[ -~]+$/,
                regexMessage: "",
              });
              if (usernameRes.status == true && passwordRes.status == true) {
                dispatch(signin({ username, password }));

                if (!authenState?.token) {
                  toast.warning("Username or password isn't correct");
                }
              } else {
                if (usernameRes.message != "") {
                  toast.warning(usernameRes.message);
                }

                if (passwordRes.message != "") {
                  toast.warning(passwordRes.message);
                }
              }
            }}
            className="btn"
          >
            Sign In
          </button>
          <Link className="link" to={ROUTES.FORGOT_PASSWORD}>
            Forgot Password?
          </Link>
          <Link className="link" to={ROUTES.SIGN_UP}>
            Sign Up
          </Link>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default SignIn;
