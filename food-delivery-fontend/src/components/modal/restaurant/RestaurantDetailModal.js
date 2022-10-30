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

import {
  insertRestaurant,
  updateRestaurant,
} from "../../../redux/restaurantSlice";
import {
  MdCategory,
  MdDescription,
  MdInfo,
  MdOutlineInfo,
  MdUpload,
} from "react-icons/md";

import FileUpload from "../../../firebase/handle-upload";
import { insertRestaurant } from "../../../redux/restaurantSlice";

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

const RestaurantDetailModal = ({
  isOpen,
  setIsOpen,
  currentRestaurant,
  setCurrentRestaurant,
  isInsertRestaurant,
  setIsInsertRestaurant,
}) => {
  console.log("current category", currentRestaurant);

  const [restaurantName, setRestaurantName] = React.useState(
    currentRestaurant?.restaurant_name
  );

  const [address, setAddress] = React.useState(currentRestaurant?.address);

  const [isActive, setIsActive] = React.useState(
    currentRestaurant?.is_active != null ? currentRestaurant?.is_active : true
  );
  const [description, setDescription] = React.useState(
    currentRestaurant?.description
  );

  const dispatch = useDispatch();

  const [restaurantImages, setRestaurantImages] = React.useState(
    currentRestaurant == null ? [] : currentRestaurant.images
  );
  // console.log("category images", restaurantImages);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = () => {
    // console.log("final category images", restaurantImages);
    if (isInsertRestaurant) {
      dispatch(
        insertRestaurant({
          restaurant_name: restaurantName,
          description: description,
          address: address,
          images: restaurantImages,
          is_active: isActive,
        })
      );
    } else {
      dispatch(
        updateRestaurant({
          restaurant_id: currentRestaurant.restaurant_id,
          restaurant_name: restaurantName,
          description: description,
          old_images: currentRestaurant.images,
          new_images: restaurantImages,
          is_active: isActive,
        })
      );
    }
    handleCancel();
  };

  const handleCancel = () => {
    setRestaurantName("");
    setDescription("");
    setRestaurantImages([]);
    setIsOpen(false);
    setCurrentRestaurant(null);
    setIsInsertRestaurant(false);
  };

  // console.log(cities.length);
  return (
    <>
      <StyledModal
        title="Insert Restaurant"
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
            name="restaurant_name"
            initialValue={restaurantName}
            rules={[
              {
                required: true,
                message: "Please input restaurant name!",
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
              // value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
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
              title: "This is active status of restaurant",
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
              firebaseFolderName="restaurant-images"
              fileList={restaurantImages}
              setFileList={setRestaurantImages}
            />
          </Form.Item>
        </Form>
      </StyledModal>
    </>
  );
};

export default React.memo(RestaurantDetailModal);
