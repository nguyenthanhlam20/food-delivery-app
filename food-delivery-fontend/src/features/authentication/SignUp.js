import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { CgProfile, CgLock } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANT_ROUTE } from "../../constants";
import authenSlide from "../../redux";
import { signup } from "../../redux/authenSlice";

import styled from "styled-components";

const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;

  margin-top: 20px;
  width: 90%;
  height: 90vh;
  // height: 500px;
  // border: 1px solid #D35400;
  border-radius: 15px;

  box-shadow: 0px 8px 8px 0px #ccc;
  background-color: #fff;
  padding: 0px;
`;

const RightComponent = styled.div`
  width: 45%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  width: 45%;
`;

const LeftComponent = styled.div`
  width: 55%;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const InputFeild = styled.input`
  width: 100%;
  padding: 15px 0px 15px 35px;
  border-radius: 8px;
  border: 2px solid #ccc;
  box-shadow: 2px 2px 2px #ccc;
  outline: none;

  &:hover {
    border: 2px solid #0000ff;
  }
`;

const Button = styled.button`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 50px;
  background-color: #d35400;
  color: #fff;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const IconContainer = styled.div`
  top: 12px;
  left: 10px;
  font-size: 20px;
  position: absolute;
  color: #0000ff;
`;

const Title = styled.h2`
  text-agile: left;
`;

const Logo = styled.div``;

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.authen.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <Container>
        <LeftComponent>
          <Logo />
        </LeftComponent>
        <RightComponent>
          <Title>Sign Up</Title>
          <InputGroup>
            <IconContainer>
              <CgProfile />
            </IconContainer>
            <InputFeild
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              required
            />
          </InputGroup>
          <InputGroup>
            <IconContainer>
              <CgProfile />
            </IconContainer>
            <InputFeild
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              required
            />
          </InputGroup>
          <InputGroup>
            <IconContainer>
              <CgLock />
            </IconContainer>
            <InputFeild
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </InputGroup>
          <InputGroup>
            <IconContainer>
              <CgLock />
            </IconContainer>
            <InputFeild
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              required
            />
          </InputGroup>
          <Button
            onClick={() => dispatch(signup({ username, password, email }))}
            className="btn"
          >
            Sign Up
          </Button>
          <StyledLink className="link" to={CONSTANT_ROUTE.SIGN_IN}>
            Sign In
          </StyledLink>
        </RightComponent>
      </Container>
    </>
  );
}

export default SignUp;
