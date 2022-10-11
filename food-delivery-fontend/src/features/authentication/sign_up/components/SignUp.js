import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { CgProfile, CgLock } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "./../../../../context/routes";
import authenSlide from "./../../../../redux";
import { signup } from "../../../../redux/authenSlice";
import "./SignUp.scss";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.authen.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <div className="container">
        <div className="signup-logo-container">
          {/* <img className="logo" src={signin_logo} /> */}
        </div>
        <div className="inner-container">
          <h2>Sign Up</h2>
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
            <CgProfile className="icon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="field"
              type="text"
              placeholder="Email"
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
          <div className="input-group">
            <CgLock className="icon" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="field"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            onClick={() => dispatch(signup({ username, password, email }))}
            className="btn"
          >
            Sign Up
          </button>
          <Link className="link" to={ROUTES.SIGN_IN}>
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignUp;
