import { Button, Card, Carousel, Col, Row, Skeleton, Space } from "antd";
import React from "react";
import styled from "styled-components";

const CardImage = styled.img`
  height: 40px;
  width: 10px;
`;
const StyledCarousel = styled(Carousel)`
  padding: 2px 0px;
`;

const Title = styled.h3`
  font-weight: 700;
`;

const { Meta } = Card;

const Wrapper = styled.div``;

const NearbyRestaurant = ({ restaurants }) => {
  // console.log(restaurants);
  const [isLoading, setIsLoading] = React.useState(true);

  const carousel = React.useRef();

  setTimeout(() => setIsLoading(false), 1000);

  let rows = parseInt(String(restaurants.length / 3));

  const remain = restaurants.length % 3;
  if (remain != 0) rows += 1;
  // alert(rows);

  const arr = [];

  for (let i = 0; i < rows; i++) {
    arr.push(i);
  }

  const renderImage = (images) => {
    return images.map((image, index) => {
      return <CardImage key={`image-${index}`} src={image.url} />;
    });
  };
  const renderColumn = (restaurantSlice) => {
    return restaurantSlice.map((restaurant, index) => (
      <Col key={restaurant.restaurant_id} span={8}>
        <Card
          className="card-menu-category"
          hoverable
          style={{
            color: "#fff",
            borderRadius: "10px",
            height: 80,
          }}
        >
          {isLoading ? (
            <>
              <Skeleton avatar active />
            </>
          ) : (
            <>
              <Space direction="horizontal" size={100}>
                <Carousel
                  // arrows={true}
                  dots={false}
                  autoplay
                  style={{ width: "inherit" }}
                >
                  {renderImage(restaurant.images)}
                </Carousel>
                <Meta
                  style={{
                    height: 24,
                    margin: "5px 0",
                    padding: "auto",
                    textAlign: "center",
                  }}
                  title={restaurant.restaurant_name}
                />
              </Space>
            </>
          )}
        </Card>
      </Col>
    ));
  };

  const renderRow = (index, rowNumber) => {
    let jumpStep = 3;
    if (remain != 0 && rowNumber === rows - 1) {
      jumpStep = remain;
    }
    const restaurantSlice = restaurants.slice(index, index + jumpStep);
    // console.log(`restaurantSlice ${rowNumber}`, restaurantSlice);
    return (
      <>
        <div key={rowNumber}>
          <Row style={{ display: "flex" }} type="flex" gutter={[12, 12]}>
            {renderColumn(restaurantSlice)}
          </Row>
        </div>
      </>
    );
  };

  const renderRestaurant = () => {
    return arr.map((rowNumber) => {
      let index = rowNumber * 3;
      return renderRow(index, rowNumber);
    });
  };

  return (
    <>
      <Wrapper>
        <Title>Nearby Restaurants</Title>
        <StyledCarousel
          ref={carousel}
          focusOnSelect={true}
          draggable
          dots={false}
        >
          {renderRestaurant()}
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

export default NearbyRestaurant;
