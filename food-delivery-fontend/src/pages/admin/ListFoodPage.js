import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListFood } from "../../features/manage/food/ListFood";
import { getCategories } from "../../redux/categorySlice";
import { getFoods } from "../../redux/foodSlice";
import { getRestaurants } from "./../../redux/restaurantSlice";

const ListFoodPage = () => {
  const dispatch = useDispatch();
  const isRefreshFood = useSelector((state) => state.food.isRefresh);
  const isRefreshCategory = useSelector((state) => state.food.isRefresh);
  const isRefreshRestaurant = useSelector(
    (state) => state.restaurant.isRefresh
  );

  const foods = useSelector((state) => state.food.data);
  const categories = useSelector((state) => state.category.data);
  const restaurants = useSelector((state) => state.restaurant.data);

  React.useEffect(() => {
    dispatch(getFoods());
  }, [isRefreshFood]);

  React.useEffect(() => {
    dispatch(getCategories());
  }, [isRefreshCategory]);

  React.useEffect(() => {
    dispatch(getRestaurants());
  }, [isRefreshRestaurant]);

  return (
    <>
      <ListFood
        foods={foods}
        categories={categories}
        restaurants={restaurants}
      />
    </>
  );
};

export default ListFoodPage;
