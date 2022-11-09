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
  // margin: 25px;
  margin-top: 25px;
  border-radius: 5px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 355px;

  &::-webkit-overflow {
    display: none;
  }
  // backgound-color: #fff;
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
const StyledCard = styled(Card)`
  background-color: #fbf8ee;
  // color: #fff;
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
        index: food.index,
        is_active: food.is_active,
      });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

export const ListFoodReduce = ({
  foods,
  setFoods,
  setCurrentFood,
  setIsInsertFood,
  setIsOpenModal,
  categories,
}) => {
  const dispatch = useDispatch();

  console.log("list foods: ", foods);
  let rows = foods.length / 3;

  const remain = foods.length % 3;
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

  const renderColumn = (foodSlice) => {
    // console.log(categories);
    return foodSlice.map((food, index) => {
      const categoryResult = categories.filter(
        (category) => category.category_id === food.category_id
      );

      const foodCategory = categoryResult[0];
      return (
        <Skeleton key={index} loading={false} active avatar>
          <Col span={8}>
            <StyledCard hoverable>
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
              </Space>

              <ButtonWrapper style={{ alignSelf: "flex-end" }}>
                <Button
                  onClick={() => handleEdit({ ...food, index: index })}
                  style={{ marginBottom: "10px" }}
                  type="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() =>
                    showConfirmModal(handleChangeStatus, {
                      index: index,
                      food_name: food.food_name,
                      is_active: food.is_active,
                    })
                  }
                  type="primary"
                >
                  {food.is_active ? "Deactivate" : "Activate"}
                </Button>
              </ButtonWrapper>
            </StyledCard>
          </Col>
        </Skeleton>
      );
    });
  };

  const renderRow = (index, rowNumber) => {
    let jumpStep = 3;
    if (remain != 0 && rowNumber === rows - 1) {
      jumpStep = remain;
    }
    const foodSlice = foods.slice(index, index + jumpStep);
    // console.log(`foodSlice ${rowNumber}`, foodSlice);
    return (
      <>
        <StyledRow key={rowNumber} type="flex" gutter={[24, 24]}>
          {renderColumn(foodSlice)}
        </StyledRow>
      </>
    );
  };

  const renderFood = () => {
    return arr.map((rowNumber) => {
      let index = rowNumber * 3;
      return renderRow(index, rowNumber);
    });
  };

  //use

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = foods?.filter(
    (item) =>
      item.food_name &&
      item.food_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleEdit = (food) => {
    console.log(food);
    setIsInsertFood(false);
    // console.log("first");
    setCurrentFood(food);
    // console.log("second");
    setIsOpenModal(true);
    // console.log("third");
  };

  const handleChangeStatus = (food) => {
    console.log("food is being change status", food);
    const newListFood = foods.slice();
    const index = food.index;

    newListFood[index] = {
      ...newListFood[index],
      is_active: !food.is_active,
    };
    setFoods(newListFood);
  };

  return (
    <>
      <Wrapper>{renderFood()}</Wrapper>
    </>
  );
};
