import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../../context/routes";
import "./AdminNavbar.scss";

const AdminNavbar = () => {
  return (
    <>
      <div className="navbar-container">
        <div className="header">
          <div className="logo"></div>
        </div>
        <div className="navbar-links">
          <ul className="list-link">
            <li>
              <Link className="link" to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link className="link" to="/authen/manage/user">
                User
              </Link>
            </li>
            <li>
              <Link className="link" to="/authen/manage/category">
                Category
              </Link>
            </li>
            <li>
              <Link className="link" to="/authen/manage/category/product">
                Product
              </Link>
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

export default AdminNavbar;
