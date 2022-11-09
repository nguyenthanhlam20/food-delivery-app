import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

import { CgProfile, CgLock } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
// import authenSlide from "../redux";
import authenSlice, { signin } from "../../redux/authenSlice";
import { CONSTANT_ROUTE } from "../../constants";
import { validateInput } from "../../helpers";
import signin_logo from "./../../assets/images/signin_logo.png";
import styled from "styled-components";

import {
  AiFillFacebook,
  AiFillGoogleCircle,
  AiFillLock,
  AiOutlineFacebook,
  AiOutlineUser,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button, Input, Space } from "antd";

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 800px;
  max-width: 100%;
  min-height: 550px;
  margin: auto;
`;

const LeftComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  position: absolute;
  height: 100%;
  width: 50%;

  padding: 30px;
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  width: 100%;
`;

const SocialIcon = styled.div`
  font-size: 30px;
`;

const Message = styled.span`
  text-align: center;
  display: inherit;
`;

const InputFeild = styled(Input)`
  padding: 10px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 7px;
  box-shadow: 2px 2px 2px #ccc;
  outline: none;
`;

const Title = styled.h1`
  font-weight: bold;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

const RightComponent = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  background: #548cff;
  background: -webkit-linear-gradient(to right, #6f38c5, #87a2fb);
  background: linear-gradient(to right, #6f38c5, #87a2fb);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  // left: -100%;
  height: 100%;
  width: 100%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const authenState = useSelector((state) => state.authen);
  const { signOut } = authenSlice.actions;

  React.useEffect(() => {
    dispatch(signOut());
  }, []);

  // console.log("first", authenState);
  React.useEffect(() => {
    if (authenState?.token != null) {
      navigate("/");
    }
  }, [authenState.token]);

  const handleSignIn = () => {
    dispatch(signin({ username: username, password: password }));
  };
  return (
    <>
      <Container>
        <LeftComponent>
          <Title>Sign in</Title>
          <SocialContainer>
            <Space
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              direction="horizontal"
              size={30}
            >
              <SocialIcon>
                <FaFacebook />
              </SocialIcon>
              <SocialIcon>
                <FcGoogle />
              </SocialIcon>
            </Space>
          </SocialContainer>
          <Space direction="vertical" size={15}>
            <Message>or use your account</Message>
            <InputFeild
              prefix={<AiOutlineUser />}
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputFeild
              prefix={<AiFillLock />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledLink to="/forgot/password">Forgot your password?</StyledLink>
            <StyledButton
              onClick={() => handleSignIn()}
              type="primary"
              size="large"
            >
              Sign In
            </StyledButton>
          </Space>
        </LeftComponent>
        <RightComponent>
          <Content>
            <Space direction="vertical" size={20}>
              <Title style={{ color: "#fff" }}>Hello, Friend!</Title>
              <Message>
                Enter your personal details and start journey with us
              </Message>
              <StyledButton>
                <Link to="/signup">Sign Up</Link>
              </StyledButton>
            </Space>
          </Content>
        </RightComponent>
      </Container>
      <ToastContainer theme="colored" position="bottom-right" />
    </>
  );
}

export default SignIn;
