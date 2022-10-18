import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROLE, Links } from "../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 40px;
  height: 60px;

  //   width: 100%;
  background: #ffffff;
`;

const NavbarList = styled.ul`
  box-sizing: border-box;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-item: center;
  padding: 0px;
  margin: 0px;
`;
const Label = styled.label`
  text-decoration: none;
`;

const IconContainer = styled.div`
  margin-right: 10px;
  font-size: 25px;
  // padding: auto;
`;
const NavbarItem = styled.li`
  box-sizing: border-box;
  padding: 5px 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 50px;
  // border: 1px solid #fff;

  &:hover {
    // border: 1px solid #ccc;

    background: linear-gradient(270deg, #9155fd 0%, #c6a7fe 100%);
    color: #fff;

    box-shadow: 0px 4px 6px -4px rgba(58, 53, 65, 0.1),
      0px 6px 10px -4px rgba(58, 53, 65, 0.08),
      0px 4px 8px -4px rgba(58, 53, 65, 0.16);
  }
`;

const Navbar = () => {
  const navigate = useNavigate();

  const renderLinks = () => {
    return Links.map((link, index) => {
      if (link.role === ROLE.EVERYONE || link.role === ROLE.ADMIN) {
        return (
          <NavbarItem key={link.path} onClick={() => navigate(link.path)}>
            <IconContainer>{link.icon}</IconContainer>
            <Label>{link.name}</Label>
          </NavbarItem>
        );
      }
    });
  };

  return (
    <>
      <Wrapper>
        <NavbarList>{renderLinks()}</NavbarList>
      </Wrapper>
    </>
  );
};

export default Navbar;
