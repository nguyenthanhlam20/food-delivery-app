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
  Spin,
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
import { insertFood, editFood } from "../../redux/foodSlice";
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

const EditRestaurantPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);

  const restaurant = useSelector(
    (state) => state.restaurant.selectedRestaurant
  );

  useEffect(() => {
    if (restaurant === null) {
      navigate(CONSTANT_ROUTE.MANAGE_RESTAURANT);
    }

    setLoading(false);
  }, []);

  const [address, setAddress] = React.useState(restaurant?.address);
  const [phone, setPhone] = React.useState(restaurant?.phone);
  const [email, setEmail] = React.useState(restaurant?.email);
  const [isActive, setIsActive] = React.useState(restaurant?.isActive);
  const [restaurantName, setRestaurantName] = React.useState(
    restaurant?.restaurant_name
  );
  const [description, setDescription] = React.useState(restaurant?.description);
  const [restaurantImages, setRestaurantImages] = React.useState(
    restaurant != null ? restaurant.images : []
  );
  const [isOpenFoodModal, setIsOpenFoodModal] = React.useState(false);
  const [currentFood, setCurrentFood] = React.useState(null);
  const [isInsertFood, setIsInsertFood] = React.useState(true);
  const [listFoods, setListFoods] = React.useState(
    restaurant != null ? restaurant.foods : []
  );

  const isCategoryRefresh = useSelector((state) => state.category.isRefresh);

  const categories = useSelector((state) => state.category.data);
  useEffect(() => {
    dispatch(getCategories());
  }, [isCategoryRefresh]);

  const handleSubmit = () => {
    const newRestaurant = {
      restaurant_id: restaurant.restaurant_id,
      restaurant_name: restaurantName,
      description: description,
      phone: phone,
      email: email,
      address: address,
      images: restaurantImages,
      is_active: isActive,
      foods: listFoods,
    };
    const response = restaurantServices.updateRestaurant(newRestaurant);

    response.then((data) => {
      listFoods.map((food) => {
        if (food.food_id == null) {
          dispatch(
            insertFood({ ...food, restaurant_id: restaurant.restaurant_id })
          );
        } else {
          dispatch(editFood({ ...food }));
        }
      });

      console.log(data);
    });

    handleCancel();
  };

  const handleCancel = () => {
    navigate(CONSTANT_ROUTE.MANAGE_RESTAURANT);
  };

  // console.log(cities.length);
  return (
    <>
      {loading ? (
        <Spin style={{ margin: "auto" }} size="large" />
      ) : (
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
                maxFile={5}
                btnMessage={"Click to Upload"}
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
                  setCurrentFood={setCurrentFood}
                  setIsInsertFood={setIsInsertFood}
                  setIsOpenModal={setIsOpenFoodModal}
                  setFoods={setListFoods}
                  categories={categories}
                  foods={listFoods}
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
      )}
    </>
  );
};

export default React.memo(EditRestaurantPage);
