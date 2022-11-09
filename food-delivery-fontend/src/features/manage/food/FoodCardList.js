import { Avatar, Button, Card, Carousel, Image, Skeleton } from "antd";
import React from "react";
import styled from "styled-components";

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
  const renderFood = () => {
    console.log(foods);
    return foods.map((food) => {
      return (
        <>
          <StyledCard>
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
            <StyledButton>Add To Card</StyledButton>
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
