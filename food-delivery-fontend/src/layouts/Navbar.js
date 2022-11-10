import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROLE, AdminsLinks, UserLinks } from "../constants";
import { decryptToken } from "../helpers/decryptToken";
import logo from "./../assets/images/logo.png";

const Wrapper = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  width: 220px;
  background: #fff;
  height: inherit;
  box-shadow: 2px 2px 2px solid #ccc;
  // border-right: 1px solid rgba(100, 100, 255, 0.1);
`;

const NavbarList = styled.ul`
  width: 100%;
  // height: 100%;
  box-sizing: border-box;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-item: flex-start;
  margin: 0;
  padding: 0;
  padding-top: 10px;
  border-top: 2px solid #fbf8ee;
`;
const Label = styled.label`
  text-decoration: none;
`;

const IconContainer = styled.div`
  margin-right: 10px;
  font-size: 25px;

  color: ${(props) => props.color};
`;
const NavbarItem = styled.li`
  padding: 3px 15px;
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
`;
const NavbarItemContainer = styled.div`
  padding: 0px 20px;
  margin-bottom: 10px;
  border-left: ${(props) => props.borderHighlight};

  &:hover {
    border-left: 5px solid #40a9ff;
    color: #fff;

    ${IconContainer} {
      color: #fff;
    }

    ${NavbarItem} {
      box-shadow: 0px 2px 2px 1px rgba(58, 53, 65, 0.1);
      background-color: #40a9ff;
      color: #fff;
    }
  }
`;

const LogoContainer = styled.div`
  box-sizing: border-box;
  width: 220px;
  height: 60px;
  // margin-bottom: 10px;
  padding-left: 50px;
  padding-top: 5px;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 50px;
  margin: auto;
`;

const Navbar = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const user = decryptToken(token);

  let links = UserLinks;

  if (user?.role === "admin") {
    links = AdminsLinks;
  }

  const currentPage = localStorage.getItem("currentPage");

  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <NavbarItemContainer
          key={link.path}
          borderHighlight={
            currentPage === link.name ? "5px solid #40a9ff" : "5px solid #fff"
          }
        >
          <NavbarItem
            backgroundColor={currentPage === link.name ? "#40a9ff" : "#fff"}
            textColor={currentPage === link.name ? "#fff" : "#000"}
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
            <IconContainer
              color={currentPage === link.name ? "#fff" : "#40a9ff"}
            >
              {link.icon}
            </IconContainer>
            <Label>{link.name}</Label>
          </NavbarItem>
        </NavbarItemContainer>
      );
    });
  };

  return (
    <>
      <Wrapper>
        <LogoContainer>
          <LogoImage src={logo} />
        </LogoContainer>
        <NavbarList>{renderLinks(links)}</NavbarList>
      </Wrapper>
    </>
  );
};

export default Navbar;
