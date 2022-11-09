import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
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
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import FoodDetailModal from "../../../components/modal/food/FoodDetailModal";

import foodServices from "./../../../services/foodServices";

import { changeActveStatus } from "../../../redux/foodSlice";

import { MdAddCircle, MdSearch, MdOutlineInfo } from "react-icons/md";

const { Search } = Input;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const Wrapper = styled.div`
  margin: 25px;
  border-radius: 5px;
`;
const HeaderWrapper = styled.div`
  margin: 25px 25px 0px 25px;
  border-radius: 5px;
  backgound-color: #fff;
  box-shadow: 0px 5px 8px 0px #ccc;
`;

const SubHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // justify-items: space-between;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
`;

const Filter = styled.div`
  // width: 100%;
`;

const StyledInput = styled(Input)`
  border-radius: 10px;
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

const showConfirmModal = (handleChangeStatus, food) => {
  // alert(food.is_active);
  confirm({
    title: `Are you sure to ${
      food.is_active == true ? "deactivate" : "activate"
    } this restaurant?`,
    // icon: <MdWarning />,
    content: `All information related to food "${food.food_name}" will be ${
      food.is_active ? "hide from the users" : "show to users"
    } `,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      handleChangeStatus({
        food_id: food.food_id,
        is_active: food.is_active,
      });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const SubHeaderComponent = ({
  // onFilter,
  setIsOpenModal,
  setCurrentFood,
  setIsInsertFood,
}) => (
  <SubHeaderWrapper>
    <Filter>
      <StyledInput
        placeholder="Search food"
        allowClear
        // onChange={onFilter}
        id="search"
        prefix={<MdSearch />}
        suffix={
          <Tooltip title="Enter food name to search">
            <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      />
    </Filter>

    <StyledButton
      type="primary"
      onClick={() => {
        setIsOpenModal(true);
        setCurrentFood(null);
        setIsInsertFood(true);
      }}
      icon={<MdAddCircle />}
    >
      Add New Food
    </StyledButton>
  </SubHeaderWrapper>
);

export const ListFood = ({ foods, categories, restaurants }) => {
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
      const categoryResult = categories.filter(
        (category) => category.category_id === food.category_id
      );
      const restaurantResult = restaurants.filter(
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
                {renderImage(food.images)}
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
                      <span style={{ fontWeight: "bold" }}>Category: </span>
                      <Image
                        style={{ width: 24, height: 23 }}
                        src={foodCategory?.images[0].url}
                      />
                      {foodCategory?.category_name}
                    </div>
                  }
                />
                <Meta
                  description={
                    <div>
                      <span style={{ fontWeight: "bold" }}>Restaurant: </span>
                      <Image
                        style={{ width: 24, height: 23 }}
                        src={foodRestaurant?.images[0].url}
                      />
                      {foodRestaurant?.restaurant_name}
                    </div>
                  }
                />
              </Space>

              <ButtonWrapper style={{ alignSelf: "flex-end" }}>
                <Button
                  onClick={() => handleEdit(food)}
                  style={{ marginBottom: "10px" }}
                  type="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => showConfirmModal(handleChangeStatus, food)}
                  type="primary"
                >
                  {food.is_active ? "Deactivate" : "Activate"}
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

  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const [currentFood, setCurrentFood] = React.useState();

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const [isInsertFood, setIsInsertFood] = React.useState(false);

  const filteredItems = foods?.filter(
    (item) =>
      item.food_name &&
      item.food_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleEdit = (row) => {
    foodServices
      .getFoodImages({
        foodId: row.food_id,
      })
      .then((response) => {
        setCurrentFood({
          food_id: row.food_id,
          food_name: row.food_name,
          category_id: row.category_id,
          restaurant_id: row.restaurant_id,
          is_active: row.is_active,
          description: row.description,
          unit_price: row.unit_price,
          like: row.like,
          dislike: row.dislike,
          images: response.food_images,
        });

        setIsOpenModal(true);
      });
  };

  const handleChangeStatus = (food) => {
    dispatch(changeActveStatus(food));
  };

  return (
    <>
      {isOpenModal ? (
        <FoodDetailModal
          categories={categories}
          restaurants={restaurants}
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          currentFood={currentFood}
          setCurrentFood={setCurrentFood}
          isInsertFood={isInsertFood}
          setIsInsertFood={setIsInsertFood}
        />
      ) : null}
      <HeaderWrapper style={{ backgroundColor: "#fff" }}>
        <SubHeaderComponent
          setIsOpenModal={setIsOpenModal}
          setCurrentFood={setCurrentFood}
          setIsInsertFood={setIsInsertFood}
        />
      </HeaderWrapper>
      <Wrapper>
        <div className="site-card-wrapper">{renderFood()}</div>
      </Wrapper>
    </>
  );
};
