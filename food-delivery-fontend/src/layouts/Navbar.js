import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROLE, Links } from "../constants";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  height: 100vh;
  width: 220px;

  //   width: 100%;
  background: #ffffff;
  box-shadow: 2px 2px 2px 2px solid rgba(100, 100, 255, 0.1);
  // border-right: 1px solid rgba(100, 100, 255, 0.1);
`;

const NavbarList = styled.ul`
  width: 100%;
  box-sizing: border-box;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-item: flex-start;
  margin: 0px;
  padding: 0px;
`;
const Label = styled.label`
  text-decoration: none;
`;

const IconContainer = styled.div`
  margin-right: 10px;
  font-size: 25px;

  color: #f49249;
`;

const NavbarItemContainer = styled.div`
  padding: 0px 20px;
  margin-bottom: 10px;
  border-left: ${(props) => props.borderHighlight};
`;
const NavbarItem = styled.li`
  padding: 3px 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
  border-radius: 15px;
  font-weight: 600;
  font-size: 15px;

  // border: 1px solid #fff;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  box-shadow: ${(props) => props.boxShadow};

  &:hover {
    ${NavbarItemContainer} {
      border-left: 5px solid #ef8035;
    }

    background-color: #fbe9cf;

    box-shadow: 0px 2px 2px 1px rgba(58, 53, 65, 0.1);
  }
`;

const Logo = styled.div`
  box-sizing: border-box;
  width: 220px;
  height: 60px;
  margin-bottom: 10px;
  // border-bottom: 1px solid #ccc;
`;

const Navbar = () => {
  const navigate = useNavigate();

  const currentPage = localStorage.getItem("currentPage");
  // console.log(currentPage);

  const renderLinks = () => {
    return Links.map((link, index) => {
      if (link.role === ROLE.EVERYONE || link.role === ROLE.ADMIN) {
        return (
          <NavbarItemContainer
            key={link.path}
            borderHighlight={
              currentPage === link.name ? "5px solid #ef8035" : "5px solid #fff"
            }
          >
            <NavbarItem
              backgroundColor={currentPage === link.name ? "#fbe9cf" : "#fff"}
              textColor={currentPage === link.name ? "#f49249" : "#000"}
              boxShadow={
                currentPage === link.name
                  ? "0px 2px 2px 1px rgba(58, 53, 65, 0.1)"
                  : "none"
              }
              onClick={() => {
                navigate(link.path);
                localStorage.setItem("currentPage", link.name);
              }}
            >
              <IconContainer>{link.icon}</IconContainer>
              <Label>{link.name}</Label>
            </NavbarItem>
          </NavbarItemContainer>
        );
      }
    });
  };

  return (
    <>
      <Wrapper>
        <Logo></Logo>
        <NavbarList>{renderLinks()}</NavbarList>
      </Wrapper>
    </>
  );
};

export default Navbar;
