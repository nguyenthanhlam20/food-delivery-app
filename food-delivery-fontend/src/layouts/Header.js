import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogoOctocat } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import authenSlice from "./../redux/authenSlice";
import defaultAvatar from "./../assets/images/default_avatar.png";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  height: 60px;
`;

const Header = () => {
  const user = useSelector((state) => state.authen.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [settingStyle, setSettingStyle] = useState(false);

  const { signOut } = authenSlice.actions;

  return (
    <>
      <Wrapper></Wrapper>
    </>
  );
};

export default Header;
