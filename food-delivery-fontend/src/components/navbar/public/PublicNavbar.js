import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../../context/routes";

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
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default PublicNavbar;
