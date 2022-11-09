import { Button, Card, Carousel, Col, Row, Skeleton, Space } from "antd";
import React from "react";
import styled from "styled-components";

const CardImage = styled.img`
  height: 90px;
  width: 10px;
`;
const StyledCarousel = styled(Carousel)`
  padding: 2px 0px;
`;

const Title = styled.h3`
  font-weight: 700;
`;
const StyledCard = styled(Card)`
  background-color: transparent;
`;
const { Meta } = Card;

const Wrapper = styled.div``;

const PopularFood = ({ foods }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const carousel = React.useRef();

  setTimeout(() => setIsLoading(false), 1000);

  let rows = parseInt(String(foods.length / 4));

  const remain = foods.length % 4;
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
      <Col span={6}>
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
              <Carousel
                // arrows={true}
                dots={false}
                autoplay
                style={{ width: "inherit" }}
              >
                {renderImage(food.images)}
              </Carousel>
              <Meta
                style={{ padding: "10px 0px" }}
                title={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      gap: 50,
                      fontSize: 13,
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontWeight: 700 }}>{food.food_name}</div>
                    <div
                      style={{
                        padding: "0px 10px",
                        backgroundColor: "#40a9ff",
                        borderRadius: 10,
                        color: "#fff",
                      }}
                    >{`$${food.unit_price}`}</div>
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
    let jumpStep = 4;
    if (remain != 0 && rowNumber === rows - 1) {
      jumpStep = remain;
    }
    const cateSlice = foods.slice(index, index + jumpStep);
    // console.log(`cateSlice ${rowNumber}`, cateSlice);
    return (
      <>
        <div>
          <Row style={{ display: "flex" }} type="flex" gutter={[30, 30]}>
            {renderColumn(cateSlice)}
          </Row>
        </div>
      </>
    );
  };

  const renderFood = () => {
    return arr.map((rowNumber) => {
      let index = rowNumber * 4;
      return renderRow(index, rowNumber);
    });
  };

  return (
    <>
      <Wrapper>
        <Title>Popular Food</Title>
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
