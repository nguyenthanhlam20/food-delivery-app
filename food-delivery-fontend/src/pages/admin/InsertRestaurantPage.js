import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Space,
  Table,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import FileUploader from "../../components/file_uploader/FileUploader";

import {
  insertRestaurant,
  updateRestaurant,
} from "../../redux/restaurantSlice";
import { MdOutlineInfo } from "react-icons/md";

import FoodDetailModalReduce from "../../components/modal/food/FoodDetailModalReduce";
import { ListFoodReduce } from "../../features/manage/food/ListFoodReduce";
import { CONSTANT_ROUTE } from "../../constants";
import { useNavigate } from "react-router";
import { insertFood } from "../../redux/foodSlice";
import { getCategories } from "../../redux/categorySlice";
import { restaurantServices } from "../../services";

const { TextArea } = Input;
const { Option } = Select;
const ButtonGroup = styled.div`
  margin-top: 50px;
  text-align: left;
`;

const Wrapper = styled.div`
  background-color: #fff;
  margin: 25px;
  padding: 25px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const InsertRestaurantPage = () => {
  const [address, setAddress] = React.useState();
  const [phone, setPhone] = React.useState();
  const [email, setEmail] = React.useState();
  const [isActive, setIsActive] = React.useState(true);
  const [restaurantName, setRestaurantName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [restaurantImages, setRestaurantImages] = React.useState([]);
  const [isOpenFoodModal, setIsOpenFoodModal] = React.useState(false);
  const [currentFood, setCurrentFood] = React.useState(null);
  const [isInsertFood, setIsInsertFood] = React.useState(true);
  const [listFoods, setListFoods] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isCategoryRefresh = useSelector((state) => state.category.isRefresh);

  const categories = useSelector((state) => state.category.data);
  useEffect(() => {
    dispatch(getCategories());
  }, [isCategoryRefresh]);

  const handleSubmit = () => {
    const newRestaurant = {
      restaurant_name: restaurantName,
      description: description,
      phone: phone,
      email: email,
      address: address,
      images: restaurantImages,
      is_active: isActive,
      // foods: listFoods,
    };
    const response = restaurantServices.insertRestaurant(newRestaurant);

    response.then((data) => {
      const currentRestaurantId = data.currentRestaurantId;
      listFoods.map((food) =>
        dispatch(insertFood({ ...food, restaurant_id: currentRestaurantId }))
      );

      console.log(data);
    });

    // handleCancel();
  };

  const handleCancel = () => {
    navigate(CONSTANT_ROUTE.MANAGE_RESTAURANT);
  };

  // console.log(cities.length);
  return (
    <>
      <Wrapper className="site-card-wrapper" style={{ height: 590 }}>
        {isOpenFoodModal ? (
          <FoodDetailModalReduce
            categories={categories}
            currentFood={currentFood}
            setCurrentFood={setCurrentFood}
            isInsertFood={isInsertFood}
            setIsInsertFood={setIsInsertFood}
            listFoods={listFoods}
            setListFoods={setListFoods}
            isOpen={isOpenFoodModal}
            setIsOpen={setIsOpenFoodModal}
          />
        ) : null}
        <StyledForm
          style={{ width: "100%" }}
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 16,
          }}
          // requiredMark="optional"
          layout="horizontal"
          onFinish={() => handleSubmit()}
        >
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
            label="Restaurant Name"
            name="restaurant_name"
            initialValue={restaurantName}
            rules={[
              {
                required: true,
                message: "Please input restaurant name!",
              },
            ]}
          >
            <Input
              required
              size="large"
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
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
            label="Address"
            name="address"
            initialValue={address}
            rules={[
              {
                required: true,
                message: "Please input restaurant address!",
              },
            ]}
          >
            <Input
              required
              size="large"
              // value={restaurantName}
              onChange={(e) => setAddress(e.target.value)}
              suffix={
                <Tooltip title="Enter restaurant address">
                  <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
            label="Phone"
            name="phone"
            initialValue={phone}
            rules={[
              {
                required: true,
                message: "Please input phone!",
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
              // value={restaurantName}
              onChange={(e) => setPhone(e.target.value)}
              suffix={
                <Tooltip title="Enter phone">
                  <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
            label="Email"
            name="email"
            initialValue={email}
            rules={[
              {
                required: true,
                message: "Please input email!",
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
              //
              // value={restaurantName}
              onChange={(e) => setEmail(e.target.value)}
              suffix={
                <Tooltip title="Enter email">
                  <MdOutlineInfo style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
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
              maxLength={100}
              // value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: 120, resize: "none" }}
              // placeholder="disable resize"
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
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
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
            tooltip={{
              title: "This is place where you can logo image to restaurant",
              icon: <MdOutlineInfo />,
            }}
            label="Restaurant Logo"
            name="restaurant_logo"
          >
            <FileUploader
              firebaseFolderName="restaurant-images"
              fileList={restaurantImages}
              setFileList={setRestaurantImages}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
            label="Restuarant Food"
            name="restaurant_food"
            tooltip={{
              title: "This is place where you can add food to restaurant",
              icon: <MdOutlineInfo />,
            }}
          >
            <Button
              onClick={() => {
                setIsOpenFoodModal(true);
                setIsInsertFood(true);
              }}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              Add Food
            </Button>
            {listFoods?.length > 0 ? (
              <ListFoodReduce
                foods={listFoods}
                setFoods={setListFoods}
                setCurrentFood={setCurrentFood}
                setIsInsertFood={setIsInsertFood}
                setIsOpenModal={setIsOpenFoodModal}
                categories={categories}
              />
            ) : null}
          </Form.Item>
        </StyledForm>
        <ButtonGroup>
          <Button
            type="ghost"
            key="back"
            style={{ marginRight: 20 }}
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </ButtonGroup>
      </Wrapper>
    </>
  );
};

export default React.memo(InsertRestaurantPage);
