import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CONSTANT_ROUTE } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  Input,
  Tooltip,
  Popconfirm,
  Table,
  Card,
  Col,
  Row,
  Carousel,
  Skeleton,
  Space,
} from "antd";
import {
  EditFilled,
  StarOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import RestaurantDetailModal from "../../../components/modal/restaurant/RestaurantDetailModal";

import restaurantServices from "./../../../services/restaurantServices";

import {
  changeActveStatus,
  getRestaurantById,
} from "../../../redux/restaurantSlice";

import {
  MdOutlineDriveFileRenameOutline,
  MdRestoreFromTrash,
  MdAddCircle,
  MdSearch,
  MdOutlineInfo,
  MdWarning,
  MdOutlineLocationOn,
  MdOutlinePhone,
  MdOutlineEmail,
} from "react-icons/md";

const { Search } = Input;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const ListRestaurantWrapper = styled.div`
  margin: 0px 25px;
  border-radius: 5px;

  // box-shadow: 0px 5px 8px 0px #ccc;
`;
const FilterWrapper = styled.div`
  margin: 25px;
  backgroun-color: #fff;
  border-radius: 5px;
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

const CardImage = styled.img`
  height: 150px;
  width: 70%;
`;

const { confirm } = Modal;
const { Meta } = Card;

const showConfirmModal = (handleChangeStatus, restaurant) => {
  // alert(restaurant.is_active);
  confirm({
    title: `Are you sure to ${
      restaurant.is_active == true ? "deactivate" : "activate"
    } this restaurant?`,
    // icon: <MdWarning />,
    content: `All information related to restaurant "${
      restaurant.restaurant_name
    }" will be ${
      restaurant.is_active ? "hide from the users" : "show to users"
    } `,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      handleChangeStatus({
        restaurant_id: restaurant.restaurant_id,
        is_active: restaurant.is_active,
      });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const SubHeaderComponent = ({ navigate }) => (
  <SubHeaderWrapper>
    <Filter>
      <StyledInput
        placeholder="Search restaurant"
        allowClear
        // onChange={onFilter}
        id="search"
        prefix={<MdSearch />}
        suffix={
          <Tooltip title="Enter restaurant name to search">
            <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      />
    </Filter>

    <StyledButton
      type="primary"
      onClick={() => navigate(CONSTANT_ROUTE.INSERT_RESTAURANT)}
      icon={<PlusCircleOutlined />}
    >
      Add New restaurant
    </StyledButton>
  </SubHeaderWrapper>
);

export const ListRestaurant = ({ restaurants }) => {
  // console.log("list restaurants: ", restaurants);
  let rows = restaurants.length / 4;

  const remain = restaurants.length % 4;
  if (remain != 0) rows += 1;

  const arr = [];

  for (let i = 0; i < rows; i++) {
    arr.push(i);
  }

  const [isLoading, setIsLoading] = React.useState(false);
  setTimeout(() => {
    if (restaurants.length > 0) {
      setIsLoading(false);
    }
  }, 2000);

  const renderImage = (images) => {
    return images.map((image, index) => {
      return <CardImage key={index} src={image.url} />;
    });
  };
  const renderColumn = (restaurantSlice) => {
    return restaurantSlice.map((restaurant, index) => (
      <Col key={index} span={6}>
        <Card
          hoverable
          style={{
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          <Space direction="vertical" size={15}>
            {isLoading ? (
              <>
                {/* <Skeleton.Image
                  style={{ height: 150, width: 247, borderRadius: 10 }}
                  active
                  size="small"
                />
                <Skeleton.Input block active size="small" />
                <Skeleton.Input block active size="small" />
                <Skeleton.Input block active size="small" />
                <Space>
                  <Skeleton.Button
                    style={{ width: 120 }}
                    shape="round"
                    active
                    size="small"
                    block
                  />
                  <Skeleton.Button
                    style={{ width: 120 }}
                    shape="round"
                    active
                    size="small"
                    block
                  />
                </Space> */}
                <Skeleton avatar active />
              </>
            ) : (
              <>
                <Carousel
                  arrows={true}
                  style={{ width: "inherit" }}
                  // dots={true}
                  // dotPosition="bottom"
                  // autoplay
                  // style={{ width: "100%" }}
                >
                  {renderImage(restaurant.images)}
                </Carousel>
                <Meta
                  key={1}
                  description={
                    <div>
                      <MdOutlineLocationOn /> {restaurant.address}
                    </div>
                  }
                />
                <Meta
                  key={2}
                  description={
                    <div>
                      <MdOutlinePhone /> {restaurant.phone}
                    </div>
                  }
                />
                <Meta
                  key={3}
                  description={
                    <div>
                      <MdOutlineEmail /> {restaurant.email}
                    </div>
                  }
                />
                <Space>
                  <Button
                    style={{ width: 120 }}
                    onClick={() => handleEdit(restaurant.restaurant_id)}
                    // style={{ marginBottom: "10px" }}
                    type="primary"
                    icon={<EditFilled />}
                  >
                    Edit
                  </Button>

                  <Button
                    style={{ width: 120 }}
                    onClick={() =>
                      showConfirmModal(handleChangeStatus, restaurant)
                    }
                    type="primary"
                    icon={<StarOutlined />}
                  >
                    {restaurant.is_active ? "Deactivate" : "Activate"}
                  </Button>
                </Space>
              </>
            )}
          </Space>
        </Card>
      </Col>
    ));
  };

  const renderRow = (index, rowNumber) => {
    let jumpStep = 4;
    if (remain != 0 && rowNumber === rows - 1) {
      jumpStep = remain;
    }
    const restaurantSlice = restaurants.slice(index, index + jumpStep);
    // console.log(`restaurantSlice ${rowNumber}`, restaurantSlice);
    return (
      <>
        <StyledRow key={rowNumber} type="flex" gutter={[24, 24]}>
          {renderColumn(restaurantSlice)}
        </StyledRow>
      </>
    );
  };

  const renderRestaurant = () => {
    return arr.map((rowNumber) => {
      let index = rowNumber * 4;
      return renderRow(index, rowNumber);
    });
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const [currentRestaurant, setCurrentRestaurant] = React.useState(-1);

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const [isInsertRestaurant, setIsInsertRestaurant] = React.useState(false);

  const selectedRestaurant = useSelector(
    (state) => state.restaurant.selectedRestaurant
  );

  useEffect(() => {
    if (currentRestaurant === selectedRestaurant?.restaurant_id) {
      navigate(CONSTANT_ROUTE.EDIT_RESTAURANT);
    }
  }, [selectedRestaurant]);

  const filteredItems = restaurants?.filter(
    (item) =>
      item.restaurant_name &&
      item.restaurant_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleEdit = (restaurantId) => {
    dispatch(getRestaurantById({ restaurant_id: restaurantId }));
    setCurrentRestaurant(restaurantId);
  };

  const handleChangeStatus = (restaurant) => {
    dispatch(changeActveStatus(restaurant));
  };

  return (
    <>
      <FilterWrapper style={{ backgroundColor: "#fff" }}>
        <SubHeaderComponent navigate={navigate} />
      </FilterWrapper>
      <ListRestaurantWrapper>
        <div className="site-card-wrapper">{renderRestaurant()}</div>
      </ListRestaurantWrapper>
    </>
  );
};
