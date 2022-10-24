import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Input, Tooltip, Popconfirm, Table } from "antd";
import RestaurantDetailModal from "../../../components/modal/restaurant/RestaurantDetailModal";

import {
  getrestaurants,
  insertRestaurant,
  deleteRestaurant,
} from "../../../redux/restaurantSlice";

import {
  MdOutlineDriveFileRenameOutline,
  MdRestoreFromTrash,
  MdAddCircle,
  MdSearch,
  MdOutlineInfo,
  MdWarning,
} from "react-icons/md";

const { Search } = Input;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const Wrapper = styled.div`
  margin: 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 8px 0px #ccc;
  // width: 100%;
`;

const Title = styled.h2`
  padding: 10px 0px 0px 20px;
`;

const StyledDataTable = styled(DataTable)`
  // border: 1px solid #000;
  margin: 0px;
  width: 100%;
`;

const Label = styled.label``;

const IconContainer = styled.div`
  display: inline-block;
  margin-right: 10px;
  font-size: 15px;
`;

const ActionWrapper = styled.div`
  padding: 5px 20px;
  // width: 50%;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  border-radius: 50px;
  box-shadow: 0px 4px 6px -4px rgba(58, 53, 65, 0.1),
    0px 6px 10px -4px rgba(58, 53, 65, 0.08),
    0px 4px 8px -4px rgba(58, 53, 65, 0.16);
  &:hover {
    background: linear-gradient(270deg, #9155fd 0%, #c6a7fe 100%);
    color: #fff;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 4px 6px -4px rgba(58, 53, 65, 0.1),
    0px 6px 10px -4px rgba(58, 53, 65, 0.08),
    0px 4px 8px -4px rgba(58, 53, 65, 0.16);

  &:hover {
    background: linear-gradient(270deg, #9155fd 0%, #c6a7fe 100%);
    color: #fff;
  }
`;

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #ccc;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const SubHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // justify-items: space-between;
  justify-content: space-between;
  width: 100%;
`;

const Filter = styled.div`
  // width: 100%;
`;

const AddButton = styled.div`
  display: flex;
  flex-direction: row;
`;

const { confirm } = Modal;

const showDeleteConfirm = (handleDelete, restaurantId) => {
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
  filterText,
  onFilter,
  onClear,
  setIsOpenModal,
  setCurrentRestaurant,
}) => (
  <SubHeaderWrapper>
    <Filter>
      <Input
        placeholder="Search Restaurant"
        allowClear
        onChange={onFilter}
        id="search"
        prefix={<MdSearch />}
        suffix={
          <Tooltip title="Enter Restaurant name to search">
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
      }}
      icon={<MdAddCircle />}
    >
      Add New Restaurant
    </StyledButton>
  </SubHeaderWrapper>
);

export const ListRestaurant = ({ restaurants }) => {
  // console.log(list restaurants: restaurants);
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const [currentRestaurant, setCurrentRestaurant] = React.useState();

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = restaurants?.filter(
    (item) =>
      item.restaurant_name &&
      item.restaurant_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <SubHeaderComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        setIsOpenModal={setIsOpenModal}
        setCurrentRestaurant={setCurrentRestaurant}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: "Restaurant Name",
      selector: (row) => row.restaurant_name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <StyledButton
            type="primary"
            icon={<MdOutlineDriveFileRenameOutline />}
            onClick={() => {
              setIsOpenModal(true);
              setCurrentRestaurant({
                restaurant_id: row.restaurant_id,
                restaurant_name: row.restaurant_name,
                description: row.description,
                image_url: row.image_url,
              });
            }}
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
  return (
    <>
      <Wrapper>
        <RestaurantDetailModal
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          currentRestaurant={currentRestaurant}
        />
        <Title>List Restaurant</Title>
        <StyledDataTable
          columns={columns}
          data={data}
          selectableRows
          selectableRowsHighlight
          pagination
          fixedHeaderScrollHeight={"500px"}
          // fixedHeader
          striped
          highlightOnHover
          pointerOnHover
          expandableRowsComponent={ExpandedComponent}
          subHeader
          subHeaderAlign={"left"}
          subHeaderComponent={subHeaderComponentMemo}
        />
      </Wrapper>
    </>
  );
};
