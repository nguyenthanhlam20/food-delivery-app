import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import categoryDefaultImg from "./../../assets/images/category-default.png";
import restaurantDefaultImg from "./../../assets/images/restaurant-default.png";
import {
  Button,
  Modal,
  Input,
  Tooltip,
  Popconfirm,
  Table,
  Card,
  Skeleton,
  Col,
  Row,
  Carousel,
  Space,
  Image,
  Select,
  Result,
  message,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { MdAddCircle, MdSearch, MdOutlineInfo } from "react-icons/md";
import { getFoods } from "../../redux/foodSlice";
import { getCategories } from "../../redux/categorySlice";
import { getRestaurants } from "../../redux/restaurantSlice";
import { AiFillStepBackward } from "react-icons/ai";
import { insertFood, updateFood } from "../../redux/CartSlice";

const { Search } = Input;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const Wrapper = styled.div`
  margin: 25px;
  border-radius: 5px;
  width: 900px;
`;
const HeaderWrapper = styled.div`
  width: 900px;
  margin: 25px 25px 0px 25px;
  border-radius: 5px;
  backgound-color: #fff;
  box-shadow: 0px 5px 8px 0px #ccc;
`;

const Filter = styled.div`
  padding: 15px;
`;

const StyledInput = styled(Input)`
  // border-radius: 10px;
  width: 170px;
`;

const StyledSelect = styled(Select)`
  // border-radius: 10px;
  width: 200px;
`;

const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  // color: #fff;
`;

const CardImage = styled.img`
  height: 150px;
  width: 70%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 15px 0px 0px 0px;
  width: 100%;
`;
const { confirm } = Modal;
const { Meta } = Card;

const SubHeaderComponent = ({
  searchTerm,
  selectedCategory,
  selectedRestaurant,
  setSelectedCategory,
  setSelectedRestaurant,
  setSearchTerm,
  categoryStore,
  restaurantStore,
}) => {
  // console.log("1st", categoryStore);

  const categories = categoryStore.slice();
  categories.push({
    category_id: -1,
    category_name: "All categories",
    description: "",
    images: [],
    is_active: false,
    number_of_food: 0,
  });
  const restaurants = restaurantStore.slice();
  restaurants.push({
    address: "",
    description: "",
    email: "",
    images: [],
    is_active: true,
    phone: "",
    restaurant_id: -1,
    restaurant_name: "All restaurants",
  });
  // console.log("2nd", categories);
  return (
    <Filter>
      <Space direction="row" size={30}>
        <StyledInput
          placeholder="Search food"
          allowClear
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          id="search"
          prefix={<MdSearch />}
          suffix={
            <Tooltip title="Enter food name to search">
              <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
        <StyledSelect
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e)}
          showSearch
          placeholder="Choose Category"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label.props.children[0].props.children ?? "").includes(
              input
            )
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label.props.children[0].props.children ?? "")
              .toLowerCase()
              .localeCompare(
                (
                  optionB?.label.props.children[0].props.children ?? ""
                ).toLowerCase()
              )
          }
          options={categories.map((category) => {
            return {
              value: category.category_id,
              label: (
                <>
                  <span style={{ display: "none" }}>
                    {category.category_name}
                  </span>

                  <Space direction="horizontal" size={7}>
                    <Image
                      src={
                        category.images.length > 0
                          ? category.images[0].url
                          : categoryDefaultImg
                      }
                      style={{ width: 24, height: 24 }}
                    />
                    <span>{category.category_name}</span>
                  </Space>
                </>
              ),
            };
          })}
        />
        <StyledSelect
          value={selectedRestaurant}
          onChange={(e) => setSelectedRestaurant(e)}
          showSearch
          placeholder="Choose Restaurant"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label.props.children[0].props.children ?? "").includes(
              input
            )
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label.props.children[0].props.children ?? "")
              .toLowerCase()
              .localeCompare(
                (
                  optionB?.label.props.children[0].props.children ?? ""
                ).toLowerCase()
              )
          }
          options={restaurants.map((restaurant) => {
            return {
              value: restaurant.restaurant_id,
              label: (
                <>
                  <span style={{ display: "none" }}>
                    {restaurant.restaurant_name}
                  </span>

                  <Space direction="horizontal" size={7}>
                    <Image
                      src={
                        restaurant.images.length > 0
                          ? restaurant.images[0].url
                          : restaurantDefaultImg
                      }
                      style={{ width: 24, height: 24 }}
                    />
                    <span>{restaurant.restaurant_name}</span>
                  </Space>
                </>
              ),
            };
          })}
        />
        <Button
          type="primary"
          onClick={() => {
            setSearchTerm("");
            setSelectedCategory(-1);
            setSelectedRestaurant(-1);
          }}
        >
          Clear Filter
        </Button>
      </Space>
    </Filter>
  );
};
const FoodList = () => {
  const dispatch = useDispatch();
  const isRefreshFood = useSelector((state) => state.food.isRefresh);
  const isRefreshCategory = useSelector((state) => state.food.isRefresh);
  const isRefreshRestaurant = useSelector(
    (state) => state.restaurant.isRefresh
  );

  const cart = useSelector((state) => state.cart.data);
  const user = useSelector((state) => state.authen.user);

  const [selectedCategory, setSelectedCategory] = React.useState(-1);
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(-1);
  const [searchTerm, setSearchTerm] = React.useState("");

  let foods = useSelector((state) => state.food.data);

  foods = foods.filter((food) => {
    if (selectedCategory === -1 && selectedRestaurant !== -1) {
      return (
        food.restaurant_id === selectedRestaurant &&
        food.food_name.includes(searchTerm)
      );
    } else if (selectedRestaurant === -1 && selectedCategory !== -1) {
      return (
        food.category_id === selectedCategory &&
        food.food_name.includes(searchTerm)
      );
    } else if (selectedRestaurant === -1 && selectedCategory === -1) {
      return food.food_name.includes(searchTerm);
    } else {
      return (
        food.restaurant_id === selectedRestaurant &&
        food.category_id === selectedCategory &&
        food.food_name.includes(searchTerm)
      );
    }
  });

  const categoryStore = useSelector((state) => state.category.data);

  const restaurantStore = useSelector((state) => state.restaurant.data);

  React.useEffect(() => {
    dispatch(getFoods());
  }, [isRefreshFood]);

  React.useEffect(() => {
    dispatch(getCategories());
  }, [isRefreshCategory]);

  React.useEffect(() => {
    dispatch(getRestaurants());
  }, [isRefreshRestaurant]);

  // console.log("list foods: ", foods);
  let rows = foods.length / 4;

  const remain = foods.length % 4;
  if (remain != 0) rows += 1;

  const arr = [];

  for (let i = 0; i < rows; i++) {
    arr.push(i);
  }

  const renderImage = (images) => {
    if (images.length > 0) {
      return images.map((image, index) => {
        return <CardImage key={index} src={image.url} />;
      });
    } else {
      return (
        <CardImage
          src={
            "https://firebasestorage.googleapis.com/v0/b/food-delivery-app-12f53.appspot.com/o/default-images%2Fno-image.png?alt=media&token=5d3c7da1-52ec-45de-aefc-fd9e96e86a81"
          }
        />
      );
    }
  };

  const renderColumn = (cateSlice) => {
    // console.log(categories);
    return cateSlice.map((food) => {
      const categoryResult = categoryStore.filter(
        (category) => category.category_id === food.category_id
      );
      const restaurantResult = restaurantStore.filter(
        (restaurant) => restaurant.restaurant_id === food.restaurant_id
      );
      const foodCategory = categoryResult[0];
      const foodRestaurant = restaurantResult[0];
      return (
        <Skeleton loading={false} active avatar>
          <Col span={6}>
            <Card
              hoverable
              style={{
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              <Carousel
                arrows={true}
                style={{ width: "inherit" }}
                // dots={true}
                // dotPosition="bottom"
                // autoplay
                // style={{ width: "100%" }}
              >
                {renderImage(food?.images)}
              </Carousel>
              <Space style={{ width: "100%" }} direction="vertical" size={15}>
                <Meta
                  title={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        gap: 50,
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{food.food_name}</div>
                      <div>{`$${food.unit_price}`}</div>
                    </div>
                  }
                />
                <Meta
                  description={
                    <div>
                      <span style={{ fontWeight: "bold" }}>Cate: </span>
                      <Image
                        style={{ width: 24, height: 23 }}
                        src={
                          foodCategory?.images.length > 0
                            ? foodCategory.images[0].url
                            : categoryDefaultImg
                        }
                      />
                      {foodCategory?.category_name}
                    </div>
                  }
                />
                <Meta
                  description={
                    <div>
                      <span style={{ fontWeight: "bold" }}>Res: </span>
                      <Image
                        style={{ width: 24, height: 23 }}
                        src={
                          foodRestaurant?.images.length > 0
                            ? foodRestaurant?.images[0].url
                            : restaurantDefaultImg
                        }
                      />
                      {foodRestaurant?.restaurant_name}
                    </div>
                  }
                />
              </Space>

              <ButtonWrapper style={{ alignSelf: "flex-end" }}>
                <Button
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
                  style={{ marginBottom: "10px" }}
                  type="primary"
                >
                  Add To Cart
                </Button>
              </ButtonWrapper>
            </Card>
          </Col>
        </Skeleton>
      );
    });
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
        <StyledRow type="flex" gutter={[24, 24]}>
          {renderColumn(cateSlice)}
        </StyledRow>
      </>
    );
  };

  const renderFood = () => {
    return arr.map((rowNumber) => {
      let index = rowNumber * 4;
      return renderRow(index, rowNumber);
    });
  };

  //use

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  return (
    <>
      <HeaderWrapper style={{ backgroundColor: "#fff" }}>
        <SubHeaderComponent
          setSelectedCategory={setSelectedCategory}
          setSelectedRestaurant={setSelectedRestaurant}
          selectedCategory={selectedCategory}
          selectedRestaurant={selectedRestaurant}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryStore={categoryStore}
          restaurantStore={restaurantStore}
        />
      </HeaderWrapper>
      {foods.length > 0 ? (
        <Wrapper>
          <div className="site-card-wrapper">{renderFood()}</div>
        </Wrapper>
      ) : (
        <Result
          icon={<AiFillStepBackward />}
          title="No data!"
          // extra={<Button type="primary">Next</Button>}
        />
      )}
    </>
  );
};

export default FoodList;
