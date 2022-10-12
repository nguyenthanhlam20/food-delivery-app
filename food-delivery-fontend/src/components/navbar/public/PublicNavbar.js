import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { CONSTANT_ROUTE } from "../../../constants";

const PublicNavbar = () => {
  return (
    <>
      <div className="navbar-container">
        <div className="logo"></div>
        <div className="main">
          <ul className="links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Order</Link>
            </li>
            <li>
              <Link to="/">My List</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link to={CONSTANT_ROUTE.SIGN_IN}>Sign In</Link>
          <Link to={CONSTANT_ROUTE.SIGN_UP}>Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default PublicNavbar;
