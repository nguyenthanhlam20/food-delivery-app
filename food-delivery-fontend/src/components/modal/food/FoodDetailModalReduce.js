import React, { useCallback, useEffect } from "react";
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
  Image,
  Form,
  InputNumber,
  Checkbox,
  Switch,
} from "antd";

import noImage from "./../../../assets/images/no-image.png";

import FileUploader from "../../file_uploader/FileUploader";
import getCities from "../../../helpers/get-cities";

import { insertFood, updateFood } from "../../../redux/foodSlice";
import { MdOutlineInfo } from "react-icons/md";

import FileUpload from "../../../firebase/handle-upload";

const { TextArea } = Input;
const { Option } = Select;

const StyledModal = styled(Modal)`
  border-radius: 13px;
`;

const FoodDetailModalReduce = ({
  categories,
  isOpen,
  setIsOpen,
  currentFood,
  setCurrentFood,
  isInsertFood,
  setIsInsertFood,
  listFoods,
  setListFoods,
}) => {
  console.log("current food", currentFood);

  const [foodName, setFoodName] = React.useState(currentFood?.food_name);

  const [isActive, setIsActive] = React.useState(
    currentFood?.is_active != null ? currentFood?.is_active : true
  );
  const [description, setDescription] = React.useState(
    currentFood?.description
  );

  const [categoryId, setCategoryId] = React.useState(currentFood?.category_id);
  const [category, setCategory] = React.useState(null);

  const [unitPrice, setUnitPrice] = React.useState(currentFood?.unit_price);

  const dispatch = useDispatch();

  const [foodImages, setFoodImages] = React.useState(
    currentFood == null ? [] : currentFood.images
  );
  // console.log("food images", foodImages);

  const renderCategories = () => {
    return categories.map((category, index) => (
      <Option
        title={category.description}
        value={category.category_id}
        key={index}
      >
        <Image
          width={24}
          height={24}
          src={category.images.length > 0 ? category.images[0].url : noImage}
        />
        <span style={{ paddingLeft: 5, display: "inline-block" }}>
          {category.category_name}
        </span>
      </Option>
    ));
  };

  const handleSubmit = () => {
    console.log("final food images", isInsertFood);
    if (isInsertFood) {
      const food = {
        index: listFoods.length,
        food_name: foodName,
        category_id: categoryId,
        unit_price: unitPrice,
        description: description,
        images: foodImages,
        is_active: isActive,
      };
      const newListFoods = listFoods.slice();
      newListFoods.push(food);
      setListFoods(newListFoods);
    } else {
      const food = {
        index: currentFood.index,
        food_id: currentFood.food_id,
        restaurant_id: currentFood.restaurant_id,
        food_name: foodName,
        category_id: categoryId,
        unit_price: unitPrice,
        description: description,
        images: foodImages,
        is_active: isActive,
      };

      // console.log("----", currentFood);
      // console.log("----", listFoods);
      const newListFoods = listFoods.slice();

      newListFoods[currentFood.index] = food;
      setListFoods(newListFoods);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setFoodName("");
    setDescription("");
    setUnitPrice("");
    setFoodImages([]);
    setIsOpen(false);
    setCurrentFood(null);
  };

  return (
    <>
      <StyledModal
        title={isInsertFood ? "Insert Food" : "Edit Food"}
        open={isOpen}
        width={700}
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
            label="Food Name"
            name="food_name"
            initialValue={foodName}
            rules={[
              {
                required: true,
                message: "Please input food name!",
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
              // value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              suffix={
                <Tooltip title="Enter food restaurant">
                  <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please choose category!",
              },
            ]}
            initialValue={{
              value: categoryId,
            }}
            tooltip={{
              title: "This is required field",
              icon: <MdOutlineInfo />,
            }}
          >
            <Select
              onChange={(categoryId) => {
                setCategoryId(categoryId);
                // setCategory(category);
                // console.log(category);
              }}
              showSearch
              style={{
                overflow: "auto",
              }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.at(1).props.children.includes(input)
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .at(1)
                  .props.children.toLowerCase()
                  .localeCompare(
                    optionB.children.at(1).props.children.toLowerCase()
                  )
              }
            >
              {renderCategories()}
            </Select>
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
            label="Unit Price"
            name="unit_price"
            initialValue={unitPrice == null ? 0 : unitPrice}
            rules={[
              {
                required: true,
                message: "Please enter unit price!",
              },
            ]}
            tooltip={{
              title: "This is required field",
              icon: <MdOutlineInfo />,
            }}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              max={10000}
              value={unitPrice}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(value) => setUnitPrice(value)}
            />
          </Form.Item>
          <Form.Item
            label="Active Status"
            name="active_status"
            tooltip={{
              title: "This is active status of food",
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
          <Form.Item label="Food Images" name="food_images">
            <FileUploader
              firebaseFolderName="food-images"
              fileList={foodImages}
              setFileList={setFoodImages}
            />
          </Form.Item>
        </Form>
      </StyledModal>
    </>
  );
};

export default React.memo(FoodDetailModalReduce);
