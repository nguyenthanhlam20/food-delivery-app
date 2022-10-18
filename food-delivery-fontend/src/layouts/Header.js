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
  justify-content: space-between;
  align-items: center;
  padding: 8px 40px;

  // width: 100%;

  height: 60px;

  /* Light/Background/Paper */

  background: #ffffff;

  border-bottom: 1px solid #ccc;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
`;

const StyledLogo = styled.div`
  color: #0000ff;
  font-size: 30px;
  margin-right: 10px;
`;

const LogoTitle = styled.h3`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 15px;
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const Name = styled.span`
  display: inline-block;
  text-align: center;
  margin: auto;
`;

const SettingContainer = styled.div`
  width: 200px;
  position: absolute;
  box-shadow: 2px 2px 5px 2px #ccc;
  left: -100px;
  top: 50px;
  border-radius: 5px;
  padding: 10px 0px 10px 0px;
  display: ${(props) => props.display};
  background-color: #fff;
`;

const ListOption = styled.ul`
  padding: 0px;
  margin: 0xp;
  list-style-type: none;
`;

const Option = styled.li`
  cursor: pointer;
  padding: 10px 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  justify-items: center;
  border-bottom: 1px solid #ccc;

  &:hover {
    background: linear-gradient(270deg, #9155fd 0%, #c6a7fe 100%);
    box-shadow: 0px 4px 6px -4px rgba(58, 53, 65, 0.1),
      0px 6px 10px -4px rgba(58, 53, 65, 0.08),
      0px 4px 8px -4px rgba(58, 53, 65, 0.16);
  }
`;

const OptionName = styled.label`
  text-align: center;
  display: inline-block;
`;

const Header = () => {
  const user = useSelector((state) => state.authen.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [settingStyle, setSettingStyle] = useState(false);

  const { signOut } = authenSlice.actions;

  return (
    <>
      <Wrapper>
        <LogoContainer>
          <StyledLogo>
            <IoLogoOctocat />
          </StyledLogo>
          <LogoTitle>food delivery</LogoTitle>
        </LogoContainer>
        <Profile>
          <Avatar
            src={defaultAvatar}
            onClick={() => setSettingStyle(!settingStyle)}
          />
          <SettingContainer display={settingStyle ? "block" : "none"}>
            <ListOption>
              <Option>
                <IoLogoOctocat className="icon" />
                <OptionName>Profile</OptionName>
              </Option>
              <Option
                onClick={() => {
                  dispatch(signOut());
                  navigate("/signin");
                }}
              >
                <IoLogoOctocat className="icon" />
                <OptionName>Log Out</OptionName>
              </Option>
            </ListOption>
          </SettingContainer>
          <Name>Name</Name>
        </Profile>
      </Wrapper>
    </>
  );
};

export default Header;
