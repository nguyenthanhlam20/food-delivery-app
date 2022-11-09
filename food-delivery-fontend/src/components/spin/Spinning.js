import styled from "styled-components";
import { Spin } from "antd";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: auto;
`;

const StyledSpin = styled(Spin)`
  margin: auto;
`;

const Spinning = () => {
  return (
    <>
      <Wrapper>
        <StyledSpin style={{ margin: "auto" }} size="large" />
      </Wrapper>
    </>
  );
};

export default Spinning;
