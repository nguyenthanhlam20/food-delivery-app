import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserHeader.scss";
import { IoLogoOctocat } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import authenSlice from "../../redux/authenSlice";
import defaultAvatar from "./../../assets/images/default_avatar.png";

const UserHeader = () => {
  const user = useSelector((state) => state.authen.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [settingStyle, setSettingStyle] = useState(false);

  const { signOut } = authenSlice.actions;

  return (
    <>
      <div className="header-container">
        <div className="logo">
          <IoLogoOctocat className="logo-icon" />
          <span className="logo-name">food delivery</span>
        </div>
        <div className="profile">
          <div className="avatar-container">
            <img
              className="avatar"
              src={defaultAvatar}
              onClick={() => setSettingStyle(!settingStyle)}
            />
            <div
              style={{ display: settingStyle ? "block" : "none" }}
              className="settings"
            >
              <ul className="options">
                <li className="opt">
                  <IoLogoOctocat className="icon" />
                  <span className="title">Profile</span>
                </li>
                <li
                  className="opt"
                  onClick={() => {
                    dispatch(signOut());
                    navigate("/signin");
                  }}
                >
                  <IoLogoOctocat className="icon" />
                  <span className="title">Log Out</span>
                </li>
              </ul>
            </div>
          </div>
          <span className="name">Name</span>
        </div>
      </div>
    </>
  );
};

export default UserHeader;
