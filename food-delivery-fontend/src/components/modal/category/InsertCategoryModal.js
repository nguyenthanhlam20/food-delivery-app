import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Modal, Input, Tooltip, message, Upload } from "antd";

import { insertCategory } from "./../../../redux/categorySlice";
import {
  MdCategory,
  MdDescription,
  MdOutlineInfo,
  MdUpload,
} from "react-icons/md";

import HandleUpload from "../../../firebase/handle-upload";

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

const InsertCategoryModal = ({ isOpen, setIsOpen }) => {
  const [categoryName, setCategoryName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const dispatch = useDispatch();

  const showModal = () => {
    setIsOpen(true);
  };
  const handleSubmit = () => {
    dispatch(
      insertCategory({
        category_name: categoryName,
        description: description,
        image_url: imageUrl,
      })
    );
    setCategoryName("");
    setDescription("");
    setImageUrl("");
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        title="Insert Category"
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
            Submit
          </Button>,
        ]}
      >
        <InputContainer>
          <StyledInput
            size="large"
            showCount
            maxLength={50}
            value={categoryName}
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
        <HandleUpload setImageUrl={setImageUrl} />
      </Modal>
    </>
  );
};

export default InsertCategoryModal;
