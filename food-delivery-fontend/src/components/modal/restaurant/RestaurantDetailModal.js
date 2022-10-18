import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Modal, Input, Tooltip, message, Upload, Select } from "antd";
import getCities from "../../../helpers/get-cities";

import { insertRestaurant } from "../../../redux/restaurantSlice";
import {
  MdCategory,
  MdDescription,
  MdOutlineInfo,
  MdUpload,
} from "react-icons/md";

import FileUpload from "../../../helpers/file-upload";

const { TextArea } = Input;
const { Option } = Select;

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
  margin-bottom: 20px;
`;

const StyledInput = styled(Input)`
  &:hover + ${Label} {
    opacity: 1;
    background: #fff;
    transform: scale(0.75) translateY(-70%) translateX(-14px);
  }

  &:not(:placeholder-shown) + ${Label} {
    opacity: 1;
    background: #fff;
    transform: scale(0.75) translateY(-70%) translateX(-14px);
  }
  box-shadow: none;
`;

const StyledTextArea = styled(TextArea)`
  box-shadow: none;
`;

const RestaurantDetailModal = ({ isOpen, setIsOpen, currentRestaurant }) => {
  const [restaurantName, setRestaurantName] = React.useState(
    currentRestaurant?.restaurant_name
  );
  const [address, setAddress] = React.useState(currentRestaurant?.address);
  const [isActive, setIsActive] = React.useState(currentRestaurant?.is_active);
  const [description, setDescription] = React.useState(
    currentRestaurant?.description
  );
  const [imageUrl, setImageUrl] = React.useState(currentRestaurant?.img_url);

  const [selectedCity, setSelectedCity] = React.useState(1);
  const [selectedDistrict, setSelectedDistrict] = React.useState("");
  const [selectedWard, setSelectedWard] = React.useState("");

  const [cities, setCities] = React.useState(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setCities(getCities());
  }, []);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = () => {
    dispatch(
      insertRestaurant({
        restaurant_name: restaurantName,
        description: description,
        image_url: imageUrl,
      })
    );
    setRestaurantName("");
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
        title="Insert Restaurant"
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
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            value={restaurantName}
            // ref={restaurantNameInput}
            placeholder="Enter restaurant name"
            prefix={<MdCategory />}
            suffix={
              <Tooltip title="Enter food restaurant">
                <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          {/* <Label>Enter restaurant name</Label> */}
        </InputContainer>
        <InputContainer>
          <StyledInput
            size="large"
            showCount
            maxLength={50}
            value={address}
            onChange={(e) => {
              console.log(e.value);
            }}
            // ref={restaurantNameInput}
            placeholder="Enter address"
            prefix={<MdCategory />}
            suffix={
              <Tooltip title="Enter food restaurant">
                <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          {/* <Label>Enter restaurant name</Label> */}
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
              <Tooltip title="Enter restaurant description">
                <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          {/* <Label>Enter restaurant description</Label> */}
        </InputContainer>
        <FileUpload setImageUrl={setImageUrl} />
        <Select
          showSearch
          style={{
            width: 200,
          }}
          onChange={(input, option) => {
            setSelectedCity(option.value);
            console.log(option.value);
          }}
          placeholder="Select city"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {cities?.map((city) => (
            <Option key={city.code} value={city.code}>
              {city.name}
            </Option>
          ))}
        </Select>
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Select districts"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {/* {cities[city - 1]?.districts.map((district) => (
            <Option value={district.code}>{district.name}</Option>
          ))} */}
        </Select>
        {/* <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Select city"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {cities?.map((city) => (
            <Option value={city.code}>{city.name}</Option>
          ))}
        </Select> */}
      </Modal>
    </>
  );
};

export default React.memo(RestaurantDetailModal);
