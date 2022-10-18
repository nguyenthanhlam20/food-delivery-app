import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Input, Tooltip, Popconfirm, Table } from "antd";
import UpdateCategoryModal from "../../../components/modal/category/UpdateCategoryModal";

import {
  getCategories,
  insertCategory,
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
import InsertCategoryModal from "../../../components/modal/category/InsertCategoryModal";

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

const showDeleteConfirm = (dispatch, categoryId) => {
  confirm({
    title: "Are you sure to delete this category?",
    // icon: <MdWarning />,
    content: "All information related to this category will be deleted",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      handleDelete(dispatch, categoryId);
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
  setIsOpenInsertModal,
}) => (
  <SubHeaderWrapper>
    <Filter>
      <Input
        placeholder="Search Category"
        allowClear
        onChange={onFilter}
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
        setIsOpenInsertModal(true);
      }}
      icon={<MdAddCircle />}
    >
      Add New Category
    </StyledButton>
  </SubHeaderWrapper>
);

const handleDelete = (dispatch, categoryId) => {
  dispatch(deleteCategory({ categoryId: categoryId }));
};

export const ListCategory = ({ categories }) => {
  // console.log(list categories: categories);
  const dispatch = useDispatch();
  const [isOpenInsertModal, setIsOpenInsertModal] = React.useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);

  const [currentCategory, setCurrentCategory] = React.useState(null);

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = categories.filter(
    (item) =>
      item.category_name &&
      item.category_name.toLowerCase().includes(filterText.toLowerCase())
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
        setIsOpenInsertModal={setIsOpenInsertModal}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.category_name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Number of Food",
      selector: (row) => row.number_of_food,
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
              setIsOpenEditModal(true);
              setCurrentCategory({
                category_id: row.category_id,
                category_name: row.category_name,
                description: row.description,
                image_url: row.image_url,
              });
            }}
          >
            Edit
          </StyledButton>

          <StyledButton
            onClick={() => showDeleteConfirm(dispatch, row.category_id)}
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

  const data = filteredItems;
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
  return (
    <>
      <Wrapper>
        <InsertCategoryModal
          isOpen={isOpenInsertModal}
          setIsOpen={setIsOpenInsertModal}
        />
        <UpdateCategoryModal
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
          currentCategory={currentCategory}
        />
        <Title>List Category</Title>
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
