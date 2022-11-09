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
  Col,
  Row,
  Carousel,
  Space,
  Skeleton,
} from "antd";
import {
  createFromIconfontCN,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import CategoryDetailModal from "../../../components/modal/category/CategoryDetailModal";

import categoryService from "./../../../services/categoryService";

import {
  getCategories,
  insertCategory,
  getCategoryImages,
  deleteCategory,
  changeActveStatus,
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
  padding: 25px;
  width: 100%;
  border-radius: 5px;
  backgound-color: #ccc;
`;
const HeaderWrapper = styled.div`
  margin: 25px 25px 0px 25px;
  // width: 100%;
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
  // display: flex;
  // height: auto;
`;

const CardImage = styled.img`
  height: 150px;
  width: 70%;
`;

const { confirm } = Modal;
const { Meta } = Card;

const showConfirmModal = (handleChangeStatus, category) => {
  // alert(category.is_active);
  confirm({
    title: `Are you sure to ${
      category.is_active == true ? "deactivate" : "activate"
    } this restaurant?`,
    // icon: <MdWarning />,
    content: `All information related to category "${
      category.category_name
    }" will be ${
      category.is_active ? "hide from the users" : "show to users"
    } `,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      handleChangeStatus({
        category_id: category.category_id,
        is_active: category.is_active,
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

const StyledColumn = styled.div`
  background: red;
  width: 100px;
  height: auto;
  margin: 10px;
`;

export const ListCategory = ({ categories }) => {
  // console.log("list categories: ", categories);
  let rows = categories.length / 6;

  const remain = categories.length % 6;
  if (remain != 0) rows += 1;

  const arr = [];

  for (let i = 0; i < rows; i++) {
    arr.push(i);
  }

  const [isLoading, setIsLoading] = React.useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const renderImage = (images) => {
    return images.map((image, index) => {
      return <CardImage key={index} src={image.url} />;
    });
  };
  const renderColumn = (cateSlice) => {
    return cateSlice.map((category) => (
      <Col span={4}>
        <Card
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
              <Carousel arrows={true} style={{ width: "inherit" }}>
                {renderImage(category.images)}
              </Carousel>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Meta
                  style={{ height: 24, margin: "5px 0" }}
                  title={category.category_name}
                />

                <Button
                  onClick={() => handleEdit(category)}
                  style={{ width: "100%", height: 32 }}
                  type="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => showConfirmModal(handleChangeStatus, category)}
                  style={{ width: "100%", height: 32 }}
                  type="primary"
                >
                  {category.is_active ? "Deactivate" : "Activate"}
                </Button>
              </Space>
            </>
          )}
        </Card>
      </Col>
    ));
  };

  const renderRow = (index, rowNumber) => {
    let jumpStep = 6;
    if (remain != 0 && rowNumber === rows - 1) {
      jumpStep = remain;
    }
    const cateSlice = categories.slice(index, index + jumpStep);
    // console.log(`cateSlice ${rowNumber}`, cateSlice);
    return (
      <>
        <StyledRow style={{ display: "flex" }} type="flex" gutter={[24, 24]}>
          {renderColumn(cateSlice)}
        </StyledRow>
      </>
    );
  };

  const renderCategory = () => {
    return arr.map((rowNumber) => {
      let index = rowNumber * 6;
      return renderRow(index, rowNumber);
    });
  };

  //use

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

  const handleChangeStatus = (category) => {
    dispatch(changeActveStatus(category));
  };

  return (
    <>
      {isOpenModal ? (
        <CategoryDetailModal
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          isInsertCategory={isInsertCategory}
          setIsInsertCategory={setIsInsertCategory}
        />
      ) : null}
      <HeaderWrapper style={{ backgroundColor: "#fff" }}>
        <SubHeaderComponent
          setIsOpenModal={setIsOpenModal}
          setCurrentCategory={setCurrentCategory}
          setIsInsertCategory={setIsInsertCategory}
        />
      </HeaderWrapper>
      <Wrapper>
        <div className="site-card-wrapper">{renderCategory()}</div>
      </Wrapper>
    </>
  );
};
