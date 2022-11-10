import { Avatar, Button, Card, Carousel, Image, message, Skeleton } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import cartSlice, { insertFood, updateFood } from "../../../redux/CartSlice";
message.config({
  maxCount: 1,
});
const { Meta } = Card;

const StyledCard = styled(Card)`
  background-color: #40a9ff;
  border-radius: 10px;
  width: 100%;
  height: 300px;
  align-content: center;
  display: flex;
  justify-content: center;
  border: none;
`;

const Wrapper = styled.div`
  padding: 20px 22px 20px 15px;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

const FoodCardList = ({ foods }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authen.user);
  const cart = useSelector((state) => state.cart.data);

  const renderFood = () => {
    // console.log(foods);
    return foods?.map((food) => {
      return (
        <>
          <StyledCard key={food.food_id}>
            <Avatar size={150} src={food.images[0].url} />
            <Meta
              style={{ width: "100%", margin: "10px 0px" }}
              title={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    gap: 100,
                    fontSize: 13,
                    justifyContent: "space-between",
                    color: "#fff",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 20 }}>
                    {food.food_name}
                  </div>
                  <div
                    style={{
                      borderRadius: 10,
                      color: "#fff",
                      fontSize: 20,
                    }}
                  >{`$${food.unit_price}`}</div>
                </div>
              }
            />
            <StyledButton
              onClick={() => {
                const existFood = cart?.info.foods.filter((fo) => {
                  return (
                    food.food_name === fo.food_name &&
                    food.unit_price === fo.unit_price
                  );
                });
                // console.log("run here", existFood);

                message.success("Add food to cart successfully");
                if (existFood.length > 0) {
                  // console.log("exit food");
                  dispatch(
                    updateFood({
                      food_id: food.food_id,
                      username: user.username,
                      quantity: existFood[0].quantity + 1,
                    })
                  );
                } else {
                  dispatch(
                    insertFood({
                      food_id: food.food_id,
                      username: user.username,
                      quantity: 1,
                    })
                  );
                }
              }}
            >
              Add To Card
            </StyledButton>
          </StyledCard>
        </>
      );
    });
  };
  return (
    <>
      <Wrapper>
        <Carousel
          autoplay
          dots={false}
          style={{
            height: 300,
          }}
        >
          {renderFood()}
        </Carousel>
      </Wrapper>
    </>
  );
};

export default FoodCardList;
