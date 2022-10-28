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
  Checkbox,
} from "antd";

import FileUploader from "../../file_uploader/FileUploader";
import getCities from "../../../helpers/get-cities";

import { insertCategory, updateCategory } from "../../../redux/categorySlice";
import {
  MdCategory,
  MdDescription,
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

const IconContainer = styled.div`
  color: #000;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  &:hover {
    ${Label} {
      top: -12px;
      left: 15px;
      opacity: 1;
      // color: #40a9ff;
      background: #fff;
    }

    ${IconContainer} {
      // color: #40a9ff;
    }
  }
`;

const StyledInput = styled(Input)`
  &:not(:placeholder-shown) + ${Label} {
    top: -12px;
    left: 15px;
    opacity: 1;
    // color: #40a9ff;
    background: #fff;
  }
  // box-shadow: none;
`;

const StyledTextArea = styled(TextArea)`
  box-shadow: none;
  &:not(:placeholder-shown) + ${Label} {
    top: -12px;
    left: 15px;
    opacity: 1;
    // color: #40a9ff;
    background: #fff;
  }
`;

const LeftComponents = styled.div`
  width: 100%;
`;

const RightComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 13px;
`;

const StyledSelect = styled(Select)`
  margin-right: 20px;
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 15px 0px 15px 15px;
  position: relative;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const StyledCheckBox = styled(Checkbox)`
  margin-bottom: 25px;
`;

const CategoryDetailModal = ({
  isOpen,
  setIsOpen,
  currentCategory,
  setCurrentCategory,
  isInsertCategory,
  setIsInsertCategory,
}) => {
  // console.log("current category", currentCategory);

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
    currentCategory?.images
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
        title="Insert Category"
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
        <LeftComponents>
          <InputContainer>
            <StyledInput
              size="large"
              showCount
              maxLength={50}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              // ref={categoryNameInput}
              // placeholder="enter category name"
              // prefix={
              //   <IconContainer>
              //     <MdCategory />
              //   </IconContainer>
              // }
              suffix={
                <Tooltip title="Enter food restaurant">
                  <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
            <Label>Enter category name</Label>
          </InputContainer>

          <InputContainer>
            <StyledTextArea
              size="large"
              showCount
              maxLength={100}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: 120, resize: "none" }}
              // placeholder="disable resize"
            />
            <Label>Enter description</Label>
          </InputContainer>
          {/* <FileUpload setImageUrl={setImageUrl} /> */}
        </LeftComponents>
        <RightComponent>
          <StyledCheckBox
            checked={isActive}
            onChange={() => setIsActive((isActive) => !isActive)}
          >
            {isActive ? "Active" : "Not Active"}
          </StyledCheckBox>
          <FileUploader
            firebaseFolderName="category-images"
            fileList={categoryImages}
            setFileList={setCategoryImages}
          />
        </RightComponent>
      </StyledModal>
    </>
  );
};

export default React.memo(CategoryDetailModal);
