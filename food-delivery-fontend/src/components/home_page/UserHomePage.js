import { Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getCategories } from "../../redux/categorySlice";
import { getFoods } from "../../redux/foodSlice";
import { getRestaurants } from "../../redux/restaurantSlice";

import MenuCategory from "../menu_category/MenuCategory";
import PopularFood from "../popular_food/PopularFood";
import NearbyRestaurant from "../restaurant/NearbyRestaurant";
import Slider from "./../slider/Slider";

const Wrapper = styled.div`
  padding: 0px 25px 25px 25px;
  width: 950px;
  height: 100vh;
`;
const UserHomePage = () => {
  const dispatch = useDispatch();
  const isRefreshCategory = useSelector((state) => state.category.isRefresh);
  const isRefreshFood = useSelector((state) => state.food.isRefresh);
  const isRefreshRestaurant = useSelector(
    (state) => state.restaurant.isRefresh
  );

  const foods = useSelector((state) => state.food.data);
  const categories = useSelector((state) => state.category.data);
  const restaurants = useSelector((state) => state.restaurant.data);

  React.useEffect(() => {
    dispatch(getCategories());
  }, [isRefreshCategory]);
  React.useEffect(() => {
    dispatch(getFoods());
  }, [isRefreshFood]);

  React.useEffect(() => {
    dispatch(getRestaurants());
  }, [isRefreshRestaurant]);

  return (
    <>
      <Wrapper>
        <Space style={{ width: "100%" }} size={15} direction="vertical">
          <Slider />
          <MenuCategory categories={categories} />
          <PopularFood foods={foods} />
          <NearbyRestaurant restaurants={restaurants} />
        </Space>
      </Wrapper>
    </>
  );
};

export default UserHomePage;
