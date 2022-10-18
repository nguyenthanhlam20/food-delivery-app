import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Modal, Input, Tooltip, message, Upload } from "antd";

import { updateCategory } from "../../../redux/categorySlice";
import {
  MdCategory,
  MdDescription,
  MdOutlineInfo,
  MdUpload,
} from "react-icons/md";

import FileUpload from "../../../helpers/file-upload";

const { TextArea } = Input;

const Label = styled.label`
  padding: 0px 5px;
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.2s;
  opacity: 0.5;
  transform: transform: scale(0.75) translateY(-70%) translateX(-14px);
  font-size: 20px;
  background: #fff;
  z-index: 1;
`;

const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled(Input)`
  // &:hover + ${Label} {
  //   opacity: 1;
  //   background: #fff;
  //   transform: scale(0.75) translateY(-70%) translateX(-14px);
  // }
  box-shadow: none;

  // &:not(:placeholder-shown) + ${Label} {
  //   opacity: 1;
  //   background: #fff;
  //   transform: scale(0.75) translateY(-70%) translateX(-14px);
  // }
`;

const StyledTextArea = styled(TextArea)`
  box-shadow: none;
`;

const UpdateCategoryModal = ({ isOpen, setIsOpen, currentCategory }) => {
  // console.log(currentCategory);
  // console.log(categoryName);

  const [categoryName, setCategoryName] = React.useState("");

  useEffect(() => {
    setCategoryName(currentCategory?.category_name);
    setDescription(currentCategory?.description);
  }, [currentCategory]);

  const [description, setDescription] = React.useState();
  const [imageUrl, setImageUrl] = React.useState("");
  const dispatch = useDispatch();

  const showModal = () => {
    setIsOpen(true);
  };
  const handleSubmit = () => {
    dispatch(
      updateCategory({
        category_id: currentCategory.category_id,
        category_name: categoryName,
        description: description,
        image_url: imageUrl,
      })
    );
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        title="Edit Category"
        open={isOpen}
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
            Save
          </Button>,
        ]}
      >
        <InputContainer>
          <StyledInput
            size="large"
            showCount
            value={categoryName}
            maxLength={50}
            onChange={(e) => setCategoryName(e.target.value)}
            // ref={categoryNameInput}
            placeholder="Enter category name"
            prefix={<MdCategory />}
            suffix={
              <Tooltip title="Enter food category">
                <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          {/* <Label>Enter category name</Label> */}
        </InputContainer>
        <InputContainer>
          <StyledInput
            size="large"
            showCount
            maxLength={100}
            typeof="textarea"
            // allowClear
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            prefix={<MdDescription />}
            suffix={
              <Tooltip title="Enter category description">
                <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          {/* <Label>Enter category description</Label> */}
        </InputContainer>
        <FileUpload setImageUrl={setImageUrl} />
      </Modal>
    </>
  );
};

export default UpdateCategoryModal;
