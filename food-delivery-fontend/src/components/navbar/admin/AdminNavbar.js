import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoFastFoodOutline } from "react-icons/io5";
import {
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineUser,
} from "react-icons/ai";
import styled from "styled-components";

const NavbarContainer = styled.div`
  background-color: #fff;
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  border-right: 2px solid #ccc;
  border-top: 1px solid #ccc;
  padding-left: 20px;
`;

const Navbar = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  letter-spacing: 0.15px;

  color: rgba(58, 53, 65, 0.87);
`;

const NavbarItem = styled.li`
  margin-right: 10px;
  text-decoration: none;
  padding: 8px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  width: 100%;
  border-radius: 10px;
  display: flex;
  // width: 148px;
  height: 42px;

  &:hover {
    background: linear-gradient(270deg, #9155fd 0%, #c6a7fe 100%);
    box-shadow: 0px 4px 6px -4px rgba(58, 53, 65, 0.1),
      0px 6px 10px -4px rgba(58, 53, 65, 0.08),
      0px 4px 8px -4px rgba(58, 53, 65, 0.16);
    border-radius: 50px;
    ${StyledLink} {
      color: #fff;
    }
  }
`;

const StyledIcon = styled.img`
  margin-right: 10px;
  color: #0000ff;
  filter: invert(0%);
`;

const AdminNavbar = () => {
  return (
    <>
      <NavbarContainer>
        <Navbar>
          <NavbarItem>
            <AiOutlineHome />
            <StyledLink to="/home">Home</StyledLink>
          </NavbarItem>
          <NavbarItem>
            <AiOutlineUser />

            <StyledLink to="/authen/manage/user">Users</StyledLink>
          </NavbarItem>
          <NavbarItem>
            <AiOutlineAppstore />

            <StyledLink to="/authen/manage/category">Category</StyledLink>
          </NavbarItem>
          <NavbarItem>
            <IoFastFoodOutline />

            <StyledLink to="/authen/manage/category/product">Food</StyledLink>
          </NavbarItem>
        </Navbar>
      </NavbarContainer>
    </>
  );
};

export default AdminNavbar;
