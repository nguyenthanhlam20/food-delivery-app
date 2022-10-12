import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { CgProfile, CgLock } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANT_ROUTE } from "./../../../../constants";
import authenSlide from "./../../../../redux";
import { signup } from "../../../../redux/authenSlice";
// import "./ChangePasword.scss";

function ChangePasword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.authen.user);

  return (
    <>
      <div className="container">
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
            onClick={() => dispatch(signup({ username, password }))}
            className="btn"
          >
            Submit
          </button>
          <Link className="link" to={CONSTANT_ROUTE.SIGN_IN}>
            Sign In
          </Link>
          {Object.keys(user).length > 0 && navigate("/")}
        </div>
      </div>
    </>
  );
}

export default ChangePasword;
