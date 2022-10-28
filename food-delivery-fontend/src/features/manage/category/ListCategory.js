import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Input, Tooltip, Popconfirm, Table } from "antd";
import CategoryDetailModal from "../../../components/modal/category/CategoryDetailModal";

import categoryService from "./../../../services/categoryService";

import {
  getCategories,
  insertCategory,
  getCategoryImages,
  deleteCategory,
} from "../../../redux/categorySlice";

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
  // width: 80%;
`;

const Title = styled.h2`
  padding: 10px 0px 0px 20px;
`;

const StyledTable = styled(Table)`
  // border: 1px solid #000;
  margin: 0px;
  border-radius: 10px;
  // width: 100%;
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
  border-radius: 10px;

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
  padding: 20px 10px 10px 10px;
`;

const Filter = styled.div`
  // width: 100%;
`;

const StyledInput = styled(Input)`
  border-radius: 10px;
`;

const AddButton = styled.div`
  display: flex;
  flex-direction: row;
`;

const { confirm } = Modal;

const showDeleteConfirm = (handleDelete, categoryId) => {
  // console.log(categoryId);
  confirm({
    title: "Are you sure to delete this restaurant?",
    // icon: <MdWarning />,
    content: "All information related to this restaurant will be deleted",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      handleDelete(categoryId);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const SubHeaderComponent = ({
  // onFilter,
  setIsOpenModal,
  setCurrentCategory,
  setIsInsertCategory,
}) => (
  <SubHeaderWrapper>
    <Filter>
      <StyledInput
        placeholder="Search Category"
        allowClear
        // onChange={onFilter}
        id="search"
        prefix={<MdSearch />}
        suffix={
          <Tooltip title="Enter category name to search">
            <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      />
    </Filter>

    <StyledButton
      type="primary"
      onClick={() => {
        setIsOpenModal(true);
        setCurrentCategory(null);
        setIsInsertCategory(true);
      }}
      icon={<MdAddCircle />}
    >
      Add New Category
    </StyledButton>
  </SubHeaderWrapper>
);

export const ListCategory = ({ categories }) => {
  // console.log("list categories: ", categories);
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const [currentCategory, setCurrentCategory] = React.useState();

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const [isInsertCategory, setIsInsertCategory] = React.useState(false);

  const filteredItems = categories?.filter(
    (item) =>
      item.category_name &&
      item.category_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleEdit = (row) => {
    categoryService
      .getCategoryImages({
        categoryId: row.category_id,
      })
      .then((response) => {
        setCurrentCategory({
          category_id: row.category_id,
          category_name: row.category_name,
          is_active: row.is_active,
          description: row.description,
          images: response.category_images,
        });

        setIsOpenModal(true);
      });
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "category_name",

      sorter: (a, b) => {
        if (a.category_name > b.category_name) return 1;
        else if (a.category_name < b.category_name) return -1;
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
            onClick={() => showDeleteConfirm(handleDelete, row.category_id)}
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

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory({ categoryId: categoryId }));
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
          <CategoryDetailModal
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            isInsertCategory={isInsertCategory}
            setIsInsertCategory={setIsInsertCategory}
          />
        ) : null}

        <SubHeaderComponent
          // onFilter={onFilter}
          setIsOpenModal={setIsOpenModal}
          setCurrentCategory={setCurrentCategory}
          setIsInsertCategory={setIsInsertCategory}
        />
        {/* <Title>List Restaurant</Title> */}
        <StyledTable
          rowKey={"category_id"}
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
