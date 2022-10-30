import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Input, Tooltip, Popconfirm, Table } from "antd";
import RestaurantDetailModal from "../../../components/modal/restaurant/RestaurantDetailModal";

import categoryService from "./../../../services/categoryService";

import { deleteRestaurant } from "../../../redux/restaurantSlice";

import {
  MdOutlineDriveFileRenameOutline,
  MdRestoreFromTrash,
  MdAddCircle,
  MdSearch,
  MdOutlineInfo,
  MdWarning,
} from "react-icons/md";
import { restaurantServices } from "../../../services";

const { Search } = Input;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const Wrapper = styled.div`
  margin: 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 8px 0px #ccc;
  // width: 80%;
`;

const StyledTable = styled(Table)`
  // border: 1px solid #000;
  margin: 0px;
  border-radius: 10px;
  // width: 100%;
`;

const SubHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // justify-items: space-between;
  justify-content: space-between;
  width: 100%;
  padding: 20px 10px 10px 10px;
`;

const Filter = styled.div`
  // width: 100%;
`;

const StyledInput = styled(Input)`
  border-radius: 10px;
`;

const { confirm } = Modal;

const showDeleteConfirm = (handleDelete, restaurantId) => {
  // console.log(restaurantId);
  confirm({
    title: "Are you sure to delete this restaurant?",
    // icon: <MdWarning />,
    content: "All information related to this restaurant will be deleted",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      handleDelete(restaurantId);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const SubHeaderComponent = ({
  // onFilter,
  setIsOpenModal,
  setCurrentRestaurant,
  setIsInsertRestaurant,
}) => (
  <SubHeaderWrapper>
    <Filter>
      <StyledInput
        placeholder="Search Restaurant"
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
      onClick={() => {
        setIsOpenModal(true);
        setCurrentRestaurant(null);
        setIsInsertRestaurant(true);
      }}
      icon={<MdAddCircle />}
    >
      Add New Restaurant
    </StyledButton>
  </SubHeaderWrapper>
);

export const ListRestaurant = ({ restaurants }) => {
  // console.log("list restaurants: ", restaurants);
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const [currentRestaurant, setCurrentRestaurant] = React.useState();

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const [isInsertRestaurant, setIsInsertRestaurant] = React.useState(false);

  const filteredItems = restaurants?.filter(
    (item) =>
      item.restaurant_name &&
      item.restaurant_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleEdit = (row) => {
    restaurantServices
      .getRestaurantImages({
        restaurantId: row.restaurant_id,
      })
      .then((response) => {
        setCurrentRestaurant({
          restaurant_id: row.restaurant_id,
          restaurant_name: row.restaurant_name,
          address: row.address,
          is_active: row.is_active,
          description: row.description,
          images: response.restaurant_images,
        });

        setIsOpenModal(true);
      });
  };

  const columns = [
    {
      title: "Restaurant Name",
      dataIndex: "restaurant_name",

      sorter: (a, b) => {
        if (a.restaurant_name > b.restaurant_name) return 1;
        else if (a.restaurant_name < b.restaurant_name) return -1;
        else return 0;
      },
      width: "20%",
    },
    {
      title: "Number of food",
      dataIndex: "number_of_food",
      sorter: (a, b) => {
        if (a.number_of_food > b.number_of_food) return 1;
        else if (a.number_of_food < b.number_of_food) return -1;
        else return 0;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => {
        if (a.description > b.description) return 1;
        else if (a.description < b.description) return -1;
        else return 0;
      },
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (row) => (
        <>
          <StyledButton
            type="primary"
            icon={<MdOutlineDriveFileRenameOutline />}
            onClick={() => handleEdit(row)}
          >
            Edit
          </StyledButton>

          <StyledButton
            onClick={() => showDeleteConfirm(handleDelete, row.restaurant_id)}
            type="primary"
            icon={<MdOutlineDriveFileRenameOutline />}
          >
            Delete
          </StyledButton>
        </>
      ),
      width: "230px",
    },
  ];

  const handleDelete = (restaurantId) => {
    dispatch(deleteRestaurant({ restaurantId: restaurantId }));
  };

  const data = filteredItems;
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <Wrapper>
        {isOpenModal == true ? (
          <RestaurantDetailModal
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
            currentRestaurant={currentRestaurant}
            setCurrentRestaurant={setCurrentRestaurant}
            isInsertRestaurant={isInsertRestaurant}
            setIsInsertRestaurant={setIsInsertRestaurant}
          />
        ) : null}

        <SubHeaderComponent
          // onFilter={onFilter}
          setIsOpenModal={setIsOpenModal}
          setCurrentRestaurant={setCurrentRestaurant}
          setIsInsertRestaurant={setIsInsertRestaurant}
        />
        {/* <Title>List Restaurant</Title> */}
        <StyledTable
          rowKey={"restaurant_id"}
          columns={columns}
          dataSource={filteredItems}
          onChange={onChange}
          scroll={{
            y: 400,
          }}
        />
      </Wrapper>
    </>
  );
};
