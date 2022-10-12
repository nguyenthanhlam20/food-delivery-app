import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

import { CgProfile, CgLock } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
// import authenSlide from "../redux";
import { signin } from "../../redux/authenSlice";
import { CONSTANT_ROUTE } from "../../constants";
import { validateInput } from "../../helpers";
import signin_logo from "./../../assets/images/signin_logo.png";
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

const StyledIcon = styled.div`
  top: 12px;
  left: 10px;
  font-size: 20px;
  position: absolute;
  color: #0000ff;
`;

const Title = styled.h2`
  text-agile: left;
`;

const Logo = styled.div`
  background-image: url(${signin_logo});
`;
function SignIn() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const authenState = useSelector((state) => state.authen);
  React.useEffect(() => {
    if (authenState?.token != null) {
      console.log(authenState.token);
      navigate("/");
    }
  }, [authenState.token]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <LeftComponent>
          <Logo />
        </LeftComponent>
        <RightComponent>
          <Title>Sign In</Title>
          <InputGroup>
            <StyledIcon>
              <CgProfile className="icon" />
            </StyledIcon>
            <InputFeild
              onChange={(e) => setUsername(e.target.value)}
              className="field"
              type="text"
              placeholder="Username"
              required
            />
          </InputGroup>
          <InputGroup>
            <StyledIcon>
              <CgLock className="icon" />
            </StyledIcon>
            <InputFeild
              onChange={(e) => setPassword(e.target.value)}
              className="field"
              type="password"
              placeholder="Password"
              required
            />
          </InputGroup>
          <Button
            onClick={() => {
              const usernameRes = validateInput({
                name: "Username",
                value: username,
                regex: /[a-zA-Z0-9]/,
                regexMessage: "characters from a-z, A-Z, 0-9",
              });
              const passwordRes = validateInput({
                name: "Password",
                value: password,
                regex: /^[ -~]+$/,
                regexMessage: "",
              });
              if (usernameRes.status == true && passwordRes.status == true) {
                dispatch(signin({ username, password }));

                if (!authenState?.token) {
                  toast.warning("Username or password isn't correct");
                }
              } else {
                if (usernameRes.message != "") {
                  toast.warning(usernameRes.message);
                }

                if (passwordRes.message != "") {
                  toast.warning(passwordRes.message);
                }
              }
            }}
            className="btn"
          >
            Sign In
          </Button>
          <StyledLink to={CONSTANT_ROUTE.FORGOT_PASSWORD}>
            Forgot Password?
          </StyledLink>
          <StyledLink className="link" to={CONSTANT_ROUTE.SIGN_UP}>
            Sign Up
          </StyledLink>
        </RightComponent>
        <ToastContainer />
      </Container>
    </>
  );
}

export default SignIn;
