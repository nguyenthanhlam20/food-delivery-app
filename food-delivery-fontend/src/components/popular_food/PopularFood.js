import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Row,
  Skeleton,
  Space,
  Tag,
} from "antd";
import React from "react";
import styled from "styled-components";

const CardImage = styled.img`
  height: 90px;
  width: 10px;
`;
const StyledCarousel = styled(Carousel)`
  padding: 2px 0px;
`;

const Title = styled(Tag)`
  font-weight: 700;
  margin-bottom: 10px;
`;
const StyledCard = styled(Card)`
  // background-color: transparent;
`;
const { Meta } = Card;

const Wrapper = styled.div``;

const PopularFood = ({ foods }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const carousel = React.useRef();

  setTimeout(() => setIsLoading(false), 1000);

  let rows = parseInt(String(foods.length / 6));

  const remain = foods.length % 6;
  if (remain != 0) rows += 1;
  // alert(rows);

  const arr = [];

  for (let i = 0; i < rows; i++) {
    arr.push(i);
  }

  const renderImage = (images) => {
    return images.map((image, index) => {
      return <CardImage key={index} src={image.url} />;
    });
  };
  const renderColumn = (cateSlice) => {
    return cateSlice.map((food) => (
      <Col span={4}>
        <StyledCard
          className="card-menu-food"
          hoverable
          style={{
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          {isLoading ? (
            <>
              <Skeleton avatar active />
            </>
          ) : (
            <>
              <div style={{ position: "relative", marginBottom: 10 }}>
                <Avatar size={100} src={food.images[0].url} />;
                <div
                  style={{
                    padding: "0px 10px",
                    backgroundColor: "#40a9ff",
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 13,
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                  }}
                >{`$${food.unit_price}`}</div>
              </div>
              <Meta
                // style={{ padding: "10px" }}
                title={
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      textAlign: "center",
                    }}
                  >
                    {food.food_name}
                  </div>
                }
              />
            </>
          )}
        </StyledCard>
      </Col>
    ));
  };

  const renderRow = (index, rowNumber) => {
    let jumpStep = 6;
    if (remain != 0 && rowNumber === rows - 1) {
      jumpStep = remain;
    }
    const cateSlice = foods.slice(index, index + jumpStep);
    // console.log(`cateSlice ${rowNumber}`, cateSlice);
    return (
      <>
        <Row
          style={{ display: "flex", padding: 3 }}
          type="flex"
          gutter={[24, 24]}
        >
          {renderColumn(cateSlice)}
        </Row>
      </>
    );
  };

  const renderFood = () => {
    return arr.map((rowNumber) => {
      let index = rowNumber * 6;
      return renderRow(index, rowNumber);
    });
  };

  return (
    <>
      <Wrapper>
        <Title color="SeaGreen">{String("Popular Food").toUpperCase()}</Title>

        <StyledCarousel
          ref={carousel}
          focusOnSelect={true}
          draggable
          dots={false}
        >
          {renderFood()}
        </StyledCarousel>
        {/* <Button
          onClick={() => {
            console.log("click next");
            carousel.current.next();
          }}
        >
          next
        </Button> */}
        {/* <Button onClick={() => carousel.current.prev()}>previous</Button> */}
      </Wrapper>
    </>
  );
};

export default PopularFood;
