import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../../context/routes";
import "./AdminNavbar.scss";
import { CgProfile, CgLock } from "react-icons/cg";
import { IoFastFoodOutline } from "react-icons/io5";

import {
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineUser,
} from "react-icons/ai";

const AdminNavbar = () => {
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-links">
          <ul className="list-link">
            <li className="link-container">
              <AiOutlineHome className="icon" />
              <Link className="link" to="/home">
                Home
              </Link>
            </li>
            <li className="link-container">
              <AiOutlineUser className="icon" />

              <Link className="link" to="/authen/manage/user">
                Users
              </Link>
            </li>
            <li className="link-container">
              <AiOutlineAppstore className="icon" />

              <Link className="link" to="/authen/manage/category">
                Category
              </Link>
            </li>
            <li className="link-container">
              <IoFastFoodOutline className="icon" />

              <Link className="link" to="/authen/manage/category/product">
                Food
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
