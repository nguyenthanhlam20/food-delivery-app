import React from "react";
import styled from "styled-components";

import { Avatar, Button, Carousel, Dropdown, InputNumber, Menu } from "antd";
import FoodCardList from "../features/manage/food/FoodCardList";
import { useDispatch, useSelector } from "react-redux";
import { getFoods } from "../redux/foodSlice";

import {
  AiFillChrome,
  AiFillSetting,
  AiFillMoneyCollect,
  AiFillDollarCircle,
} from "react-icons/ai";
import { TbTrash } from "react-icons/tb";
import authenSlice from "../redux/authenSlice";
const Wrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 380px;
  height: 100%;
  align-self: flex-start;
  //   margin-right: 100px;
`;

const TopComponent = styled.div`
  width: 100%;
  padding-left: 15px;
  // height: 70px;
  display: flex;
  flex-direction: row;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;

const UserName = styled.div`
  font-size: 15px;
  font-weight: 700;
`;
const Role = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #40a9ff;
`;

const More = styled.div`
  border: 2px solid #40a9ff;
  border-radius: 100px;
  height: 19px;
  width: 19px;
  text-align: center;
  font-size: 12px;
  color: #40a9ff;
  margin-top: 10px;
`;

const UselessWrapper = styled.div``;

const ListFood = styled.div`
  overflow-y: scroll;
  height: 150px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MyCard = styled.div`
  padding: 0px 15px;
`;
const Title = styled.h3`
  font-weight: 700;
  font-size: 20px;
`;

const BottomComponent = styled.div`
  padding: 15px;
`;

const Food = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const VerticalWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Text = styled.div`
  font-weight: 700;
  font-size: 13px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
  background-color: #40a9ff;
  height: 40px;
  font-weight: 700;
`;

const TotalTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

const TotalValue = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

const Padding = styled.div`
  padding: 10px 0px;
`;

const StyledInputNumber = styled(InputNumber)`
  width: 50px;
  height: 23px;
  font-size: 12px;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const isRefreshFood = useSelector((state) => state.food.isRefresh);

  const foods = useSelector((state) => state.food.data);

  const [total, setTotal] = React.useState(0);

  const { signOut } = authenSlice.actions;

  React.useEffect(() => {
    dispatch(getFoods());
  }, [isRefreshFood]);

  const menu = (
    <Menu>
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item onClick={() => dispatch(signOut())}>Logout</Menu.Item>
    </Menu>
  );
  const renderCart = () => {
    return foods.map((food) => {
      return (
        <>
          <Food>
            <Avatar
              style={{ marginRight: 10 }}
              size={60}
              src={food.images[0].url}
            />
            <VerticalWrapper>
              <Padding>
                <HorizontalWrapper>
                  <Text>{food.food_name}</Text>
                  <Text>${food.unit_price}</Text>
                </HorizontalWrapper>
              </Padding>
              <HorizontalWrapper>
                <StyledInputNumber
                  size="small"
                  defaultValue={1}
                  min={1}
                  max={100}
                  controls={true}
                  onChange={(e) => {
                    setTotal(total + parseInt(e) * food.unit_price);
                  }}
                />
                {/* <FoodName></FoodName> */}
                <TbTrash style={{ marginTop: 3 }} />
              </HorizontalWrapper>
            </VerticalWrapper>
          </Food>
        </>
      );
    });
  };

  return (
    <>
      <Wrapper>
        <TopComponent>
          <Profile>
            <Avatar
              size="large"
              style={{ marginRight: 10, border: "1px solid #40a9ff" }}
              src="https://joeschmoe.io/api/v1/random"
            />
            <UselessWrapper>
              <UserName>Andrew Kerr</UserName>
              <Role>User</Role>
            </UselessWrapper>
          </Profile>
          <Dropdown overlay={menu}>
            <More>
              <AiFillSetting />
            </More>
          </Dropdown>
        </TopComponent>
        <FoodCardList foods={foods} />
        <MyCard>
          <Title>My Cart</Title>
          <ListFood>{renderCart()}</ListFood>
        </MyCard>
        <BottomComponent>
          <HorizontalWrapper>
            <TotalTitle>Total</TotalTitle>
            <TotalValue>${total}</TotalValue>
          </HorizontalWrapper>
          <StyledButton prefix={<AiFillDollarCircle />} type="primary">
            Checkout
          </StyledButton>
        </BottomComponent>
      </Wrapper>
    </>
  );
};

export default Sidebar;
