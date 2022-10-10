import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import { CgProfile, CgLock } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import authenSlide from "./../../../../redux";
import { signin } from "../../../../redux/authenSlice";

import "./SignIn.scss";
import { validateInput } from "../../../../helpers";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.authen.user);

  return (
    <>
      <div className="container">
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

                if (Object.keys(user).length == 0) {
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
          <Link className="link" to="forgot/password">
            Forgot Password?
          </Link>
          {Object.keys(user).length > 0 && navigate("/")}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default SignIn;
