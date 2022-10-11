import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserHeader.scss";
import { IoLogoOctocat } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import authenSlice from "../../redux/authenSlice";

const UserHeader = () => {
  const user = useSelector((state) => state.authen.user);
  // console.log(user);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const { signOut } = authenSlice.actions;

  return (
    <>
      <div className="header-container">
        <div className="logo">
          <IoLogoOctocat className="logo-icon" />
          <span className="logo-name">food delivery</span>
        </div>
        <div className="profile">
          <img className="avatar" src={user?.imgUrl} alt="avatar" />
          <span className="name">{user?.username}</span>
        </div>
        <button
          onClick={() => {
            dispatch(signOut());
            navigator("/signin");
          }}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default UserHeader;
