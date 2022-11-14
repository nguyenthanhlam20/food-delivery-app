import React from "react";
import styled from "styled-components";
import { Input, Image, Button } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import HeaderImage from "./../../assets/images/header-image.png";
import Slider from "../slider/Slider";

const Wrapper = styled.div`
  width: 950px;

  padding: 10px 25px 0px 25px;
`;

const Welcome = styled.h2`
  margin: 0px;
  font-weight: 700;
`;

const Message = styled.h5`
  color: #40a9ff;
`;

const TopComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const LeftComponent = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
`;
const RightComponent = styled.div`
  width: 50%;
  text-align: right;
  padding: 5px;
`;

const BottomComponent = styled.div`
  width: 100%;
  height: 140px;
  border-radius: 20px;
  background-color: #40a9ff;
  margin: 10px 0px;
  padding: 13px 22px;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 700;
`;

const StyledInput = styled(Input)`
  width: 200px;
  border-radius: 20px;
  color: #40a9ff;
  border-color: #40a9ff;

  &::placeholder {
    color: #40a9ff;
  }
`;
const UserHeader = ({ user }) => {
  // console.log(user);
  return (
    <>
      <Wrapper>
        <TopComponent>
          <LeftComponent>
            <Welcome>Hello {user.username}!</Welcome>
            <Message>What do you want to Eat?</Message>
          </LeftComponent>
        </TopComponent>
      </Wrapper>
    </>
  );
};

export default UserHeader;
