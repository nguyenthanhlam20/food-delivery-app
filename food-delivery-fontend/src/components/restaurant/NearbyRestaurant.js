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
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePhone,
  MdRestaurant,
} from "react-icons/md";
import styled from "styled-components";

const StyledCarousel = styled(Carousel)`
  padding: 2px 0px;
`;
const Title = styled(Tag)`
  font-weight: 700;
  margin-bottom: 10px;
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
      return <Avatar key={`image-${index}`} src={image.url} />;
    });
  };
  const renderColumn = (restaurantSlice) => {
    return restaurantSlice.map((restaurant, index) => (
      <Col key={restaurant.restaurant_id} span={8}>
        <Card
          className="card-restaurant"
          hoverable
          style={{
            color: "#fff",
            borderRadius: "10px",
            height: 100,
          }}
        >
          {isLoading ? (
            <>
              <Skeleton avatar active />
            </>
          ) : (
            <>
              <Space
                direction="horizontal"
                style={{ display: "flex", flexDirection: "row" }}
                size={25}
              >
                <Avatar
                  key={`image-${index}`}
                  size={70}
                  src={restaurant.images[0].url}
                />

                <Meta
                  style={{ padding: 0 }}
                  key={1}
                  description={
                    <>
                      <div style={{ fontWeight: 700, color: "#000" }}>
                        <MdRestaurant /> {restaurant.restaurant_name}
                      </div>
                      <div>
                        <MdOutlineLocationOn /> {restaurant.address}
                      </div>
                      <div>
                        <MdOutlinePhone /> {restaurant.phone}
                      </div>
                    </>
                  }
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
        <Row
          key={rowNumber}
          style={{ display: "flex", padding: 3 }}
          type="flex"
          gutter={[12, 12]}
        >
          {renderColumn(restaurantSlice)}
        </Row>
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
        <Title color="fuchsia">
          {String("Nearby Restaurants").toUpperCase()}
        </Title>

        <StyledCarousel
          ref={carousel}
          focusOnSelect={true}
          draggable
          dots={false}
        >
          {renderRestaurant()}
        </StyledCarousel>
      </Wrapper>
    </>
  );
};

export default NearbyRestaurant;
