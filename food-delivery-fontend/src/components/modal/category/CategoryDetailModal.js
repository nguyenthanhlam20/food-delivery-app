import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  Button,
  Modal,
  Input,
  Tooltip,
  message,
  Upload,
  Select,
  Form,
  Checkbox,
  Switch,
} from "antd";

import FileUploader from "../../file_uploader/FileUploader";
import getCities from "../../../helpers/get-cities";

import { insertCategory, updateCategory } from "../../../redux/categorySlice";
import {
  MdCategory,
  MdDescription,
  MdInfo,
  MdOutlineInfo,
  MdUpload,
} from "react-icons/md";

import FileUpload from "../../../firebase/handle-upload";

const { TextArea } = Input;
const { Option } = Select;

const Label = styled.label`
  padding: 0px 5px;
  pointer-events: none;
  position: absolute;
  text-align: left;
  left: 30px;
  top: 10px;
  transition: 0.2s;
  font-size: 15px;
  background: #fff;
  opacity: 1;
  z-index: 1;
  text-transform: capitalize;
`;

const StyledModal = styled(Modal)`
  border-radius: 13px;
`;

const CategoryDetailModal = ({
  isOpen,
  setIsOpen,
  currentCategory,
  setCurrentCategory,
  isInsertCategory,
  setIsInsertCategory,
}) => {
  console.log("current category", currentCategory);

  const [categoryName, setCategoryName] = React.useState(
    currentCategory?.category_name
  );

  const [isActive, setIsActive] = React.useState(
    currentCategory?.is_active != null ? currentCategory?.is_active : true
  );
  const [description, setDescription] = React.useState(
    currentCategory?.description
  );

  const dispatch = useDispatch();

  const [categoryImages, setCategoryImages] = React.useState(
    currentCategory == null ? [] : currentCategory.images
  );
  // console.log("category images", categoryImages);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = () => {
    // console.log("final category images", categoryImages);
    if (isInsertCategory) {
      dispatch(
        insertCategory({
          category_name: categoryName,
          description: description,
          images: categoryImages,
          is_active: isActive,
        })
      );
    } else {
      dispatch(
        updateCategory({
          category_id: currentCategory.category_id,
          category_name: categoryName,
          description: description,
          old_images: currentCategory.images,
          new_images: categoryImages,
          is_active: isActive,
        })
      );
    }
    handleCancel();
  };

  const handleCancel = () => {
    setCategoryName("");
    setDescription("");
    setCategoryImages([]);
    setIsOpen(false);
    setCurrentCategory(null);
    setIsInsertCategory(false);
  };

  // console.log(cities.length);
  return (
    <>
      <StyledModal
        title={isInsertCategory ? "Insert Category" : "Edit Category"}
        open={isOpen}
        width={1000}
        centered
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button type="ghost" key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          style={{ width: "100%" }}
          requiredMark="optional"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Catgory Name"
            name="category_name"
            initialValue={categoryName}
            rules={[
              {
                required: true,
                message: "Please input category name!",
              },
            ]}
            tooltip={{
              title: "This is required field",
              icon: <MdOutlineInfo />,
            }}
          >
            <Input
              required
              size="large"
              showCount
              maxLength={50}
              // value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              suffix={
                <Tooltip title="Enter food restaurant">
                  <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            initialValue={description}
            tooltip={{
              title: "This is optional field",
              icon: <MdOutlineInfo />,
            }}
          >
            <TextArea
              size="large"
              showCount
              maxLength={100}
              // value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: 120, resize: "none" }}
              // placeholder="disable resize"
            />
          </Form.Item>
          <Form.Item
            label="Active Status"
            name="active_status"
            tooltip={{
              title: "This is active status of category",
              icon: <MdOutlineInfo />,
            }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Switch
              checked={isActive}
              onChange={() => setIsActive((isActive) => !isActive)}
            />
          </Form.Item>
          <Form.Item>
            <FileUploader
              firebaseFolderName="category-images"
              fileList={categoryImages}
              setFileList={setCategoryImages}
            />
          </Form.Item>
        </Form>
      </StyledModal>
    </>
  );
};

export default React.memo(CategoryDetailModal);
