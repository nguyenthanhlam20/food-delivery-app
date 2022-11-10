import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authenSlice from "./../../redux/authenSlice";
// import defaultAvatar from "./../assets/images/default_avatar.png";
import { MdList } from "react-icons/md";

import styled from "styled-components";
import { Button } from "antd";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  background-color: #fff;
  height: 60px;
  padding: 0px 20px;
`;

const IconContainer = styled.div`
  border-radius: 50px;
  font-size: 35px;
  color: #40a9ff;
  margin-right: 20px;

  // &:hover {
  //   color: #40a9aa;
  // }
`;

const PageTitle = styled.h2``;

const AdminHeader = ({ user }) => {
  const pageTitle = localStorage.getItem("currentPage");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [settingStyle, setSettingStyle] = useState(false);

  const { signOut } = authenSlice.actions;

  return (
    <>
      <Wrapper>
        <IconContainer>
          <MdList />
        </IconContainer>
        <PageTitle>{pageTitle}</PageTitle>
        <Button
          onClick={() => {
            dispatch(signOut());
            navigate("/");
          }}
        >
          Logout
        </Button>
      </Wrapper>
    </>
  );
};

export default AdminHeader;
