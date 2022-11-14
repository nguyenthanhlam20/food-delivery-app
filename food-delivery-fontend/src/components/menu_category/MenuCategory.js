import { Button, Card, Carousel, Col, Row, Skeleton, Space, Tag } from "antd";
import React from "react";
import styled from "styled-components";

const CardImage = styled.img`
  height: 60px;
  width: 5px;
`;
const StyledCarousel = styled(Carousel)`
  // padding: 10px;
`;

const Title = styled(Tag)`
  font-weight: 700;
  margin-bottom: 10px;
`;

const { Meta } = Card;

const Wrapper = styled.div``;

const MenuCategory = ({ categories }) => {
  // console.log(categories);
  const [isLoading, setIsLoading] = React.useState(true);

  const carousel = React.useRef();

  setTimeout(() => setIsLoading(false), 1000);

  let rows = parseInt(String(categories.length / 8));

  const remain = categories.length % 8;
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
    return cateSlice.map((category) => (
      <Col span={3}>
        <Card
          className="card-menu-category"
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
                {renderImage(category.images)}
              </Carousel>
              <Meta
                style={{
                  height: 24,
                  margin: "5px 0",
                  padding: "auto",
                  textAlign: "center",
                }}
                title={category.category_name}
              />
            </>
          )}
        </Card>
      </Col>
    ));
  };

  const renderRow = (index, rowNumber) => {
    let jumpStep = 8;
    if (remain != 0 && rowNumber === rows - 1) {
      jumpStep = remain;
    }
    const cateSlice = categories.slice(index, index + jumpStep);
    // console.log(`cateSlice ${rowNumber}`, cateSlice);
    return (
      <>
        <Row
          style={{ display: "flex", padding: 2 }}
          type="flex"
          gutter={[12, 12]}
        >
          {renderColumn(cateSlice)}
        </Row>
      </>
    );
  };

  const renderCategory = () => {
    return arr.map((rowNumber) => {
      let index = rowNumber * 8;
      return renderRow(index, rowNumber);
    });
  };

  return (
    <>
      <Wrapper>
        <Title color="tomato">{String("menu category").toUpperCase()}</Title>
        <StyledCarousel
          ref={carousel}
          focusOnSelect={true}
          draggable
          dots={false}
        >
          {renderCategory()}
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

export default MenuCategory;
