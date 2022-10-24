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

import { insertRestaurant } from "../../../redux/restaurantSlice";
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
  // width: 260px;
  text-align: left;
  left: 25px;
  top: 5px;
  transition: 0.2s;
  opacity: 1;
  transform: translateY(-70%) translateX(-14px);
  font-size: 15px;
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
    transform: translateY(-70%) translateX(-14px);
  }

  &:not(:placeholder-shown) + ${Label} {
    opacity: 1;
    background: #fff;
    transform: translateY(-70%) translateX(-14px);
  }
  box-shadow: none;
`;

const StyledTextArea = styled(TextArea)`
  box-shadow: none;
`;

const LeftComponents = styled.div`
  width: 100%;
`;

const RightComponent = styled.div`
  width: 100%;
`;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: row;
  align-items: center;
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

  const [selectedCity, setSelectedCity] = React.useState(null);
  const [selectedDistrict, setSelectedDistrict] = React.useState(null);
  const [selectedWard, setSelectedWard] = React.useState("");

  const [cities, setCities] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);

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
        address: address,
        description: description,
        image_url: imageUrl,
        is_active: isActive,
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

  // console.log(cities.length);

  const renderCity = () => {
    return cities?.map((city, index) => (
      <Option key={index} value={city.code}>
        {city.name}
      </Option>
    ));
  };

  const renderDistrict = () => {
    if (selectedCity != null) {
      return districts.map((district, index) => (
        <Option key={index} value={district.code}>
          {district.name}
        </Option>
      ));
    }
  };

  const renderWards = () => {
    if (selectedDistrict != null) {
      // console.log(wards);
      return wards.map((ward, index) => (
        <Option key={index} value={ward.code}>
          {ward.name}
        </Option>
      ));
    }
  };

  useEffect(() => {
    const city = selectedCity ? cities[selectedCity].name : "";
    const district = selectedDistrict ? districts[selectedDistrict].name : "";
    const ward = selectedWard ? wards[selectedWard].name : "";

    setAddress(`${ward}, ${district}, ${city}`);
  }, [selectedWard, selectedCity, selectedDistrict]);

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
        <LeftComponents>
          <InputContainer>
            <StyledInput
              size="large"
              showCount
              maxLength={50}
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              // ref={restaurantNameInput}
              placeholder="Enter restaurant name"
              prefix={<MdCategory />}
              suffix={
                <Tooltip title="Enter food restaurant">
                  <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
            <Label>Enter restaurant name</Label>
          </InputContainer>

          <InputContainer>
            <StyledInput
              size="large"
              showCount
              maxLength={100}
              typeof="textarea"
              // style={{ width: "30%" }}
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
            <Label>Enter description</Label>
          </InputContainer>
          {/* <FileUpload setImageUrl={setImageUrl} /> */}
          <AddressContainer>
            <StyledSelect
              style={{ width: "33%" }}
              showSearch
              onChange={(input, option) => {
                // console.log(option.key);
                setSelectedCity(option.key);
                setDistricts(cities[option.key].districts);
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
              {renderCity()}
            </StyledSelect>
            <StyledSelect
              showSearch
              style={{ width: "33%" }}
              onChange={(input, option) => {
                setSelectedDistrict(option.key);
                setWards(districts[option.key].wards);
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
              {renderDistrict()}
            </StyledSelect>
            <StyledSelect
              showSearch
              style={{ width: "33%" }}
              onChange={(input, option) => {
                // console.log(option.key);
                setSelectedWard(option.key);
              }}
              placeholder="Select wards"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {renderWards()}
            </StyledSelect>
            <Label>Choose Address</Label>
          </AddressContainer>
        </LeftComponents>
        <RightComponent>
          <Checkbox
            checked={isActive}
            onChange={() => setIsActive((isActive) => !isActive)}
          >
            {isActive ? "Active" : "Not Active"}
          </Checkbox>
          <FileUploader />
        </RightComponent>
      </StyledModal>
    </>
  );
};

export default React.memo(RestaurantDetailModal);
